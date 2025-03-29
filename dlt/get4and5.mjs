import fs from "fs/promises";
import { validCombos } from "./all.mjs";

// 过滤符合条件的组合
function filterCombos(validCombos, arr) {
  if (!Array.isArray(arr)) {
    throw new Error("arr must be an array");
  }

  const arrSet = new Set(arr);
  const match4 = [];
  const match5 = [];
  const match4Set = new Set();

  validCombos.forEach((combo) => {
    let count = 0;
    for (const num of combo) {
      if (arrSet.has(num)) {
        count++;
      }
    }
    if (count === 4) {
      const comboStr = combo.join(",");
      if (!match4Set.has(comboStr)) {
        match4Set.add(comboStr);
        match4.push(combo);
      }
    } else if (count === 5) {
      match5.push(combo);
    }
  });

  return { match4, match5 };
}

// 导出数组到文件
async function exportToFile(data, filePath) {
  const output =
    `export const combos = [\n` +
    data.map((combo) => `  [${combo.join(", ")}]`).join(",\n") +
    `\n];`;
  await fs.writeFile(filePath, output);
  console.log(`已将 ${data.length} 个组合保存到 ${filePath}`);
}

// 主函数
async function main() {
  const arr = [12, 22, 25, 27, 28];

  const { match4, match5 } = filterCombos(validCombos, arr);

  await exportToFile(match4, "match4.mjs");
  await exportToFile(match5, "match5.mjs");
}

main().catch((error) => {
  console.error("发生错误:", error);
});
// 控制4个一样的数字的匹配在40个数字范围 这组号码就能保留
