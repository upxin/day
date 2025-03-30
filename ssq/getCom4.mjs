import { ipt } from "./s033.mjs";
import fs from "fs/promises";

// 生成组合的函数
function getCombinations(arr, size) {
  const result = [];
  const stack = [];

  function backtrack(start) {
    if (stack.length === size) {
      result.push([...stack]);
      return;
    }

    for (let i = start; i <= arr.length - (size - stack.length); i++) {
      stack.push(arr[i]);
      backtrack(i + 1);
      stack.pop();
    }
  }

  backtrack(0);
  return result;
}

// 生成唯一组合的函数
function generateUniqueCombinations() {
  const combinations = new Set();
  const lines = ipt.trim().split("\n");
  for (const line of lines) {
    const [frontPart] = line.split("#");
    if (!frontPart) continue;

    const numbers = frontPart
      .trim()
      .split(" ")
      .map(Number)
      .filter((num) => !isNaN(num) && num > 0 && num <= 33); // 数字范围保持33

    if (numbers.length < 4) {
      // 组合数量改为4个
      console.warn(`跳过无效行：数字数量不足（${numbers.length}）`);
      continue;
    }

    const currentCombos = getCombinations(numbers, 4); // 组合数量改为4
    for (const combo of currentCombos) {
      combinations.add(combo.sort((a, b) => a - b).join(","));
    }
  }

  return Array.from(combinations).map((str) => str.split(",").map(Number));
}

// 生成33选4的所有组合
const allNumbers = Array.from({ length: 33 }, (_, i) => i + 1); // 数字范围保持33
const allPossibleCombinations = getCombinations(allNumbers, 4).map(
  (
    combo // 组合数量改为4
  ) => combo.sort((a, b) => a - b).join(",")
);

// 生成输入数据中的组合
const inputCombinations = generateUniqueCombinations().map((combo) =>
  combo.sort((a, b) => a - b).join(",")
);

// 找出不在输入数据组合中的组合
const restCombinations = allPossibleCombinations
  .filter((combo) => !inputCombinations.includes(combo))
  .map((str) => str.split(",").map(Number));

// 生成所有组合
const allCombinations = generateUniqueCombinations();

// 构建输出内容 - 生成的组合
const outputContent = `export const validCombos = [
${allCombinations.map((combo) => `  [${combo.join(", ")}]`).join(",\n")}
];`;

// 构建输出内容 - 剩余的组合
const restOutputContent = `export const restValidCombos = [
${restCombinations.map((combo) => `  [${combo.join(", ")}]`).join(",\n")}
];`;

// 写入文件 - 生成的组合
fs.writeFile("all4.mjs", outputContent, "utf8") // 文件名改为all4.mjs
  .then(() => {
    console.log("所有生成的组合已成功导出到 all4.mjs 文件。");
  })
  .catch((err) => {
    console.error("导出 all4.mjs 文件时出错:", err);
  });

// 写入文件 - 剩余的组合
fs.writeFile("rest4.mjs", restOutputContent, "utf8") // 文件名改为rest4.mjs
  .then(() => {
    console.log("所有剩余的组合已成功导出到 rest4.mjs 文件。");
  })
  .catch((err) => {
    console.error("导出 rest4.mjs 文件时出错:", err);
  });
