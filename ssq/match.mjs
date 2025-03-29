import fs from "fs/promises";
import path from "path";
import { validCombos } from "./all33.mjs";
// 此文件是查看匹配到4个的是不是太多 ，生成的数据越少越好
// 输入数据（示例数据）

const target = [3, 5, 18, 25, 26, 27, 29];

// 配置项（可修改此处调整筛选阈值）
const minMatch = 4;

// 计算匹配数量并分组
const groupedCombos = validCombos.reduce((acc, combo) => {
  const count = combo.filter((num) => target.includes(num)).length;
  if (count >= minMatch) {
    acc[count] = acc[count] || [];
    acc[count].push(combo);
  }
  return acc;
}, {});

// 生成文件写入任务
const writePromises = [];
for (const matchCount of Object.keys(groupedCombos)) {
  const outputPath = path.join(process.cwd(), `${matchCount}.mjs`);
  let content = `export const result = [\n`;
  const combos = groupedCombos[matchCount];
  combos.forEach((combo, index) => {
    content += `  [${combo.join(", ")}]`;
    if (index < combos.length - 1) {
      content += ",\n";
    } else {
      content += "\n";
    }
  });
  content += "];";
  writePromises.push(fs.writeFile(outputPath, content));
}

// 执行写入操作
Promise.all(writePromises)
  .then(() => {
    console.log(`成功生成文件：${Object.keys(groupedCombos).join(", ")}`);
  })
  .catch((error) => {
    console.error("写入文件时出错:", error);
  });
