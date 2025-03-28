import * as fs from "fs";
import * as path from "path";
import { ipt } from "./t032.mjs";

// 生成指定数组的 k 个元素的所有组合
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
    // 生成所有 5 个元素的组合
    const combos = generateCombinations(group, 5);

    combos.forEach((combo) => {
        // 计算和值
        const sum = combo.reduce((acc, val) => acc + val, 0);
        if (sum > 125) return;
        if (sum < 60) return;
        // 计算最大最小值差
        const min = Math.min(...combo);
        const max = Math.max(...combo);
        if (max - min >= 16) {
            validCombos.push(combo.sort((a, b) => a - b));
        }
    });
});

// 处理输出格式
let outputContent = `export const validCombos = [\n`;
validCombos.forEach((combo, index) => {
    outputContent += `  [${combo.join(', ')}]`;
    if (index < validCombos.length - 1) {
        outputContent += ',\n';
    } else {
        outputContent += '\n';
    }
});
outputContent += '];';

const outputPath = path.join(process.cwd(), "all32.mjs");
fs.writeFileSync(outputPath, outputContent);
