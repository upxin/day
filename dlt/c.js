const fs = require("fs");
const path = require("path");

// 生成从数组中取 n 个元素的所有组合
function getCombinations(arr, n) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === n) {
      result.push([...current]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// 主函数，生成组合并导出到文件
function generateAndExportCombinations(arr, n) {
  const combinations = getCombinations(arr, n);
  const formattedCombinations = combinations.map((combo) => combo.join(","));

  const outputFilePath = path.join(__dirname, "com.js");
  const outputContent = `module.exports = ${JSON.stringify(
    formattedCombinations
  )};`;

  fs.writeFile(outputFilePath, outputContent, "utf8", (err) => {
    if (err) {
      console.error("写入文件时出错:", err);
    } else {
      console.log(`组合结果已保存到 ${outputFilePath}`);
    }
  });
}

// 示例调用
const arr = [16, 19, 1, 9, 24, 23];
const n = 2;
generateAndExportCombinations(arr, n);
