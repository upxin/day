// 原始数据和全局变量（假设g1、g2、sortedIpt已定义）
// const g1 = [...]
// const g2 = [...]
// const sortedIpt = [...]

// 解析后的数据存储
let parsedData = [];

// 构建表头
const tableHeader = document.getElementById("table-header");
const headerRow = document.createElement("tr");

// 添加索引列表头
const indexTh = document.createElement("th");
indexTh.textContent = "序号";
headerRow.appendChild(indexTh);

// 生成 1-35 的表头（添加data-value属性用于排序）
for (let i = 1; i <= 35; i++) {
  const th = document.createElement("th");
  th.textContent = i;
  th.dataset.value = i;
  th.dataset.type = "number";
  headerRow.appendChild(th);
}

// 添加分隔符列
const hashTh = document.createElement("th");
hashTh.textContent = "#（个数）";
hashTh.dataset.type = "hash";
headerRow.appendChild(hashTh);

// 生成 1-12 的表头（仅显示，不参与排序逻辑）
for (let i = 1; i <= 12; i++) {
  const th = document.createElement("th");
  th.textContent = i;
  headerRow.appendChild(th);
}

tableHeader.appendChild(headerRow);

// 解析数据并存储
function parseData() {
  const lines = sortedIpt.trim().split("\n");
  parsedData = [];
  
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

      parsedData.push({
        rowIndex,
        numbers1To35,
        numbers1To12,
        hashCount,
        isDoubleHash,
        countBeforeHash: numbers1To35.length
      });
    }
  });
}

// 数字转中文大写函数
function numToChinese(num) {
  const chnNum = [
    "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"
  ];
  return chnNum[num - 1] || "";
}

// 渲染表格内容
function renderTable(sortedData = parsedData) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // 清空表格内容
  
  sortedData.forEach((item, index) => {
    const row = document.createElement("tr");

    // 添加索引列
    const indexTd = document.createElement("td");
    indexTd.textContent = numToChinese(index + 1);
    row.appendChild(indexTd);

    // 处理 1-35 范围的数字
    for (let i = 1; i <= 35; i++) {
      const cell = document.createElement("td");
      cell.textContent = item.numbers1To35.includes(i) ? i : "";
      if (g1.includes(i)) {
        cell.classList.add("highlight");
      }
      row.appendChild(cell);
    }

    // 添加分隔符列
    const hashTd = document.createElement("td");
    hashTd.textContent = item.isDoubleHash 
      ? `##${item.countBeforeHash}` 
      : `#${item.countBeforeHash}`;
      
    if (item.isDoubleHash) {
      hashTd.classList.add("purple-highlight");
    }
    row.appendChild(hashTd);

    // 处理 1-12 范围的数字（仅显示）
    for (let i = 1; i <= 12; i++) {
      const cell = document.createElement("td");
      cell.textContent = item.numbers1To12.includes(i) ? i : "";
      if (g2.includes(i)) {
        cell.classList.add("red");
      }
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });
}

// 排序表格（仅处理1-35范围的数字）
function sortTable(columnIndex, columnType, columnValue) {
  let sortedData = [...parsedData];
  
  if (columnType === "hash") {
    // 按#前数字个数降序排列
    sortedData.sort((a, b) => b.countBeforeHash - a.countBeforeHash);
  } else if (columnType === "number") {
    // 按包含指定数字的行优先，再按#前数字个数降序排列
    const number = parseInt(columnValue);
    
    sortedData.sort((a, b) => {
      // 检查行是否包含指定数字
      const hasA = a.numbers1To35.includes(number);
      const hasB = b.numbers1To35.includes(number);
      
      // 优先包含指定数字的行
      if (hasA && !hasB) return -1;
      if (!hasA && hasB) return 1;
      
      // 若都包含或都不包含，则按#前数字个数降序排列
      return b.countBeforeHash - a.countBeforeHash;
    });
  }
  
  renderTable(sortedData);
}

// 为表头添加点击事件
headerRow.querySelectorAll("th").forEach((th, index) => {
  th.addEventListener("click", () => {
    // 仅处理1-35列和#列的排序
    if (index >= 1 && index <= 35 || index === 36) {
      const type = th.dataset.type;
      const value = th.dataset.value;
      sortTable(index, type, value);
    }
  });
});

// 初始化
parseData();
renderTable();
