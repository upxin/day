// 定义需要添加样式的数字数组
const tableHeader = document.getElementById("table-header");
const headerRow = document.createElement("tr");
const LR = 9
// 添加索引列表头
const indexTh = document.createElement("th");
indexTh.textContent = "序号";
headerRow.appendChild(indexTh);

// 生成 1 - 33 的表头
for (let i = 1; i <= 33; i++) {
  const th = document.createElement("th");
  th.textContent = i;
  headerRow.appendChild(th);
}

// 生成 1 - 16 的表头
for (let i = 1; i <= 16; i++) {
  const th = document.createElement("th");
  th.textContent = i;
  headerRow.appendChild(th);
}

tableHeader.appendChild(headerRow);

const lines = ipt.trim().split("\n");
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
  ];
  return chnNum[num - 1] || "";
}

lines.forEach((line, rowIndex) => {
  if (line) {
    const [numbers1To35Str, numbers1To12Str] = line.split("#");
    const numbers1To35 = numbers1To35Str.trim().split(" ").map(Number);
    const numbers1To12 = numbers1To12Str.trim().split(" ").map(Number);

    const row = document.createElement("tr");

    // 添加索引列
    const indexTd = document.createElement("td");
    indexTd.textContent = numToChinese(rowIndex + 1); // 行号从1开始
    row.appendChild(indexTd);

    // 处理 1 - 33 范围的数字
    for (let i = 1; i <= 33; i++) {
      const cell = document.createElement("td");
      cell.textContent = numbers1To35.includes(i) ? i : "";
      if (g1.includes(i)) {
        cell.classList.add("highlight");
      }
      row.appendChild(cell);
    }

    // 处理 1 - 16 范围的数字
    for (let i = 1; i <= 16; i++) {
      const cell = document.createElement("td");
      cell.textContent = numbers1To12.includes(i) ? i : "";
      if (g2.includes(i)) {
        cell.classList.add("red");
      }
      row.appendChild(cell);
    }

    // 第六行添加red类（行号从1开始，第六行对应index=5）
    if (rowIndex + 1 === LR) {
      row.classList.add("red");
    }

    tableBody.appendChild(row);
  }
});
