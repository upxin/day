const fs = require("fs");
const { ipt } = require("./043.js");
const p = "all043-4.js";

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

    if (numbers.length < 4) {
      console.warn(`跳过无效行：数字数量不足（${numbers.length}）`);
      continue;
    }

    const currentCombos = getCombinations(numbers, 4);
    allCombos.push(...currentCombos);
  }

  return allCombos;
}

const allCombinations = generateCombinations();
console.log(allCombinations.length);

// 对组合进行去重
const uniqueCombinations = [];
const combinationSet = new Set();
for (const combo of allCombinations) {
  const comboStr = combo.sort((a, b) => a - b).join(",");
  if (!combinationSet.has(comboStr)) {
    combinationSet.add(comboStr);
    uniqueCombinations.push(combo);
  }
}

// 构建输出内容
const outputContent = `const validCombos4 = [
${uniqueCombinations.map((combo) => `  [${combo.join(", ")}]`).join(",\n")}
];
module.exports = {
  validCombos4,
};`;

fs.writeFile(p, outputContent, "utf8", (err) => {
  if (err) {
    console.error("写入文件时出错:", err);
  } else {
    console.log("文件写入成功");
  }
});

// 将 uniqueCombinations 作为模块的导出
module.exports = uniqueCombinations;
