const fs = require("fs");
const path = require("path");
// 假设 038.js 已经转换为 CommonJS 模块格式
const { ipt } = require("./039.js");

function generateCombinations(arr, k) {
  const result = [];
  const backtrack = (start, current) => {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  };
  backtrack(0, []);
  return result;
}

// 解析输入数据
const lines = ipt.trim().split("\n");
const groups = lines.map((line) => {
  const parts = line.split("#")[0].trim();
  return parts
    .split(" ")
    .filter((str) => /^\d+$/.test(str))
    .map(Number);
});

// 处理所有组合
const validCombos = [];
groups.forEach((group) => {
  // 去重处理
  const uniqueGroup = [...new Set(group)];
  if (uniqueGroup.length < 6) return;

  // 生成所有 6 元素的组合
  const combos = generateCombinations(uniqueGroup, 6);

  combos.forEach((combo) => {
    // 计算和值
    const sum = combo.reduce((acc, val) => acc + val, 0);
    if (sum > 130) return;
    if (sum < 70) return;

    // 计算最大最小值差
    const min = Math.min(...combo);
    const max = Math.max(...combo);
    if (max - min >= 16) {
      validCombos.push(combo.sort((a, b) => a - b));
    }
  });
});

// 生成格式化输出
const formattedCombos = validCombos.map((combo) => `[${combo.join(",")}]`);
const outputContent = `let validCombos = [
  ${formattedCombos.join(",\n  ")}
];module.exports ={ validCombos};`;

const outputPath = path.join(process.cwd(), "all039.js");
fs.writeFileSync(outputPath, outputContent);

// 如果你想在当前文件中导出 validCombos 变量供其他文件使用
