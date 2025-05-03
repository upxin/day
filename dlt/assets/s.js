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

// 生成 1 - 12 的表头
for (let i = 1; i <= 12; i++) {
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
    "十七",
    "十八",
    "十九",
    "二十",
    "二十一",
    "二十二",
    "二十三",
    "二十四",
    "二十五",
    "二十六",
    "二十七",
    "二十八",
    "二十九",
    "三十",
    "三十一",
    "三十二",
    "三十三",
    "三十四",
    "三十五",
    "三十六",
    "三十七",
    "三十八",
    "三十九",
    "四十",
    "四十一",
    "四十二",
    "四十三",
    "四十四",
    "四十五",
    "四十六",
    "四十七",
    "四十八",
    "四十九",
    "五十",
    "五十一",
    "五十二",
    "五十三",
    "五十四",
    "五十五",
    "五十六",
    "五十七",
    "五十八",
    "五十九",
    "六十",
    "六十一",
    "六十二",
    "六十三",
    "六十四",
    "六十五",
    "六十六",
    "六十七",
    "六十八",
    "六十九",
    "七十",
    "七十一",
    "七十二",
    "七十三",
    "七十四",
    "七十五",
    "七十六",
    "七十七",
    "七十八",
    "七十九",
    "八十",
    "八十一",
    "八十二",
    "八十三",
    "八十四",
    "八十五",
    "八十六",
    "八十七",
    "八十八",
    "八十九",
    "九十",
    "九十一",
    "九十二",
    "九十三",
    "九十四",
    "九十五",
    "九十六",
    "九十七",
    "九十八",
    "九十九",
    "一百",
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
    indexTd.textContent = numToChinese(rowIndex + 1); // 行号从 1 开始
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
