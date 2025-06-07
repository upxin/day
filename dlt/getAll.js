let fs = require("fs");
let { ipt } = require("./data.js");
let p = "all.js";

// 生成组合的函数
function getCombinations(arr, size) {
  let result = [];
  let stack = [];

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
  let allCombos = [];
  let lines = ipt.trim().split("\n");
  for (let line of lines) {
    let [frontPart] = line.split("#");
    if (!frontPart) continue;

    let numbers = frontPart
      .trim()
      .split(" ")
      .map(Number)
      .filter((num) => !isNaN(num) && num > 0 && num <= 35);

    if (numbers.length < 5) {
      console.warn(`跳过无效行：数字数量不足（${numbers.length}）`);
      continue;
    }

    let currentCombos = getCombinations(numbers, 5);
    allCombos.push(...currentCombos);
  }

  return allCombos;
}

let allCombinations = generateCombinations();
console.log(allCombinations.length);

// 构建输出内容
let outputContent = `let validCombos = [
${allCombinations.map((combo) => `  [${combo.join(", ")}]`).join(",\n")}
];
module.exports = {
  validCombos,
};`;

fs.writeFile(p, outputContent, "utf8", (err) => {
  if (err) {
    console.error("写入文件时出错:", err);
  } else {
    console.log("文件写入成功");
  }
});

// 将 allCombinations 作为模块的导出
module.exports = allCombinations;
