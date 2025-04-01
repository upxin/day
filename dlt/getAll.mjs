// generateCombinations.mjs
import { ipt } from "./034.mjs";

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

// 生成组合的函数，不进行去重
function generateCombinations() {
  const allCombos = [];
  const lines = ipt.trim().split("\n");
  for (const line of lines) {
    const [frontPart] = line.split("#");
    if (!frontPart) continue;

    const numbers = frontPart
      .trim()
      .split(" ")
      .map(Number)
      .filter((num) => !isNaN(num) && num > 0 && num <= 35);

    if (numbers.length < 5) {
      console.warn(`跳过无效行：数字数量不足（${numbers.length}）`);
      continue;
    }

    const currentCombos = getCombinations(numbers, 5);
    allCombos.push(...currentCombos);
  }

  return allCombos;
}

export const allCombinations = generateCombinations();
console.log(allCombinations.length);

// exportToFile.mjs
import fs from "fs/promises";

// 构建输出内容
const outputContent = `export const validCombos = [
${allCombinations.map((combo) => `  [${combo.join(", ")}]`).join(",\n")}
];`;

fs.writeFile("all034.mjs", outputContent, "utf8")
  .then(() => {
  })
  .catch((err) => {
  });
