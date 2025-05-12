const tableHeader = document.getElementById("table-header");
const headerRow = document.createElement("tr");

// 添加索引列表头
const indexTh = document.createElement("th");
indexTh.textContent = "序号";
headerRow.appendChild(indexTh);

// 生成 1 - 35 的表头
for (let i = 1; i <= 35; i++) {
  const th = document.createElement("th");
  th.textContent = i;
  headerRow.appendChild(th);
}

// 添加分隔符列
const hashTh = document.createElement("th");
hashTh.textContent = "#（个数）"; // 修改表头文本
headerRow.appendChild(hashTh);

// 生成 1 - 12 的表头
for (let i = 1; i <= 12; i++) {
  const th = document.createElement("th");
  th.textContent = i;
  headerRow.appendChild(th);
}

tableHeader.appendChild(headerRow);

const lines = sortedIpt.trim().split("\n");
const tableBody = document.getElementById("table-body");

// 数字转中文大写函数
function numToChinese(num) {
  const chnNum = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九",
    "二十",
  ];
  return chnNum[num - 1] || "";
}

lines.forEach((line, rowIndex) => {
  if (line) {
    // 检测 # 的数量
    const hashCount = (line.match(/#/g) || []).length;
    const isDoubleHash = hashCount === 2;

    // 处理数据分割
    const parts = line.split("#").map((part) => part.trim());

    // 确保 parts 数组长度至少为 2
    while (parts.length < 2) parts.push("");

    const numbers1To35Str = parts[0];
    const numbers1To12Str = isDoubleHash ? `${parts[1]} ${parts[2]}` : parts[1];

    const numbers1To35 = numbers1To35Str.split(" ").filter(Boolean).map(Number);
    const numbers1To12 = numbers1To12Str.split(" ").filter(Boolean).map(Number);

    const row = document.createElement("tr");

    // 添加索引列
    const indexTd = document.createElement("td");
    indexTd.textContent = numToChinese(rowIndex + 1);
    row.appendChild(indexTd);

    // 处理 1 - 35 范围的数字
    for (let i = 1; i <= 35; i++) {
      const cell = document.createElement("td");
      cell.textContent = numbers1To35.includes(i) ? i : "";
      if (g1.includes(i)) {
        cell.classList.add("highlight");
      }
      row.appendChild(cell);
    }

    // 添加分隔符列
    const hashTd = document.createElement("td");
    const numbersBeforeHashCount = numbers1To35.length; // 计算#前面数字的个数
    hashTd.textContent = `#${numbersBeforeHashCount}`; // 拼接个数
    if (isDoubleHash) {
      hashTd.textContent = `##${numbersBeforeHashCount}`; // 显示两个#并拼接个数
      hashTd.classList.add("purple-highlight"); // 仅给这个单元格添加紫色样式
    }
    row.appendChild(hashTd);

    // 处理 1 - 12 范围的数字
    for (let i = 1; i <= 12; i++) {
      const cell = document.createElement("td");
      cell.textContent = numbers1To12.includes(i) ? i : "";
      if (g2.includes(i)) {
        cell.classList.add("red");
      }
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }
});
