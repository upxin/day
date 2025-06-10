const basePath = "./hisData/";
ipt = window.ipt || "";
function numToChinese(num) {
  function generateIndexArray(length = 100) {
    return Array.from({ length }, (_, i) => `I${i + 1}`);
  }

  // 使用示例
  const chnNum = generateIndexArray(200);
  return chnNum[num - 1] || "";
}
function showError(lineNumber, message) {
  // 创建对话框元素
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `
    <p>第 ${lineNumber} 错误：${message}</p>
  `;

  document.body.appendChild(dialog);
  dialog.showModal(); // 显示模态对话框

  // 关闭后移除元素
  dialog.addEventListener("close", () => {
    document.body.removeChild(dialog);
  });
}

function normalizeIptFormat(input) {
  const lines = input.trim().split("\n");

  const extractPairsStrict = (text, max) => {
    const raw = text.replace(/\s/g, "");
    if (raw.length % 2 !== 0) return null;

    const pairs = raw.match(/\d{2}/g) || [];
    const valid = pairs.filter((p) => {
      const n = parseInt(p, 10);
      return n >= 1 && n <= max;
    });

    return valid.length === pairs.length ? valid : null;
  };

  const normalizedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;
    if (!rawLine.includes(",")) {
      showError(i, rawLine + "没有逗号");
      return;
    }

    let isDoubleHash = rawLine.includes(",,");
    let [left = "", right = ""] = isDoubleHash
      ? rawLine.split(",,").map((s) => s.trim())
      : rawLine.split(",").map((s) => s.trim());

    const leftNums = extractPairsStrict(left, 35);
    const rightNums = extractPairsStrict(right, 12);

    if (leftNums === null || (right && rightNums === null)) {
      showError(i, rawLine);
      return rawLine; // 返回原始错误行
    }

    const formatted =
      rightNums.length > 0
        ? `${leftNums.join(" ")} ${isDoubleHash ? ",," : ","} ${rightNums.join(
            " "
          )}`
        : `${leftNums.join(" ")}`;

    normalizedLines.push(formatted);
  }

  return normalizedLines.join("\n");
}

function sortByNumberCountBeforeHash(input) {
  const lines = input.trim().split("\n");
  const linesWithCount = lines.map((line) => {
    let numbersPart = "",
      commentPart = "";
    const hashIndex = line.indexOf(",");
    if (hashIndex !== -1) {
      numbersPart = line.slice(0, hashIndex).trim();
      commentPart = line.slice(hashIndex).trim();
    } else {
      numbersPart = line.trim();
    }

    const newLine = numbersPart + (commentPart ? ` ${commentPart}` : "");
    return {
      line: newLine,
      count: numbersPart.split(" ").length,
    };
  });
  linesWithCount.sort((a, b) => b.count - a.count);
  return linesWithCount.map((item) => item.line).join("\n");
}

function parseData() {
  const lines = ipt.trim().split("\n");
  parsedData = [];

  lines.forEach((line, rowIndex) => {
    if (line) {
      const hashCount = (line.match(/,/g) || []).length;
      const isDoubleHash = hashCount === 2;
      const parts = line.split(",").map((p) => p.trim());
      while (parts.length < 2) parts.push("");

      const numbers1To35 = parts[0].split(" ").filter(Boolean);
      const numbers1To12 = (isDoubleHash ? `${parts[1]} ${parts[2]}` : parts[1])
        .split(" ")
        .filter(Boolean);

      parsedData.push({
        rowIndex,
        numbers1To35,
        numbers1To12,
        hashCount,
        isDoubleHash,
        countBeforeHash: numbers1To35.length,
      });
    }
  });
}

function renderTable(sortedData = parsedData) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");
  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  const headerRow = document.createElement("tr");
  const indexTh = document.createElement("th");
  indexTh.textContent = "序号";
  headerRow.appendChild(indexTh);

  for (let i = 1; i <= 35; i++) {
    const th = document.createElement("th");
    th.textContent = i.toString().padStart(2, "0");
    th.dataset.value = i.toString().padStart(2, "0");
    th.dataset.type = "number";
    headerRow.appendChild(th);
  }

  const hashTh = document.createElement("th");
  hashTh.textContent = ",";
  hashTh.dataset.type = "hash";
  headerRow.appendChild(hashTh);

  for (let i = 1; i <= 12; i++) {
    const th = document.createElement("th");
    th.textContent = i.toString().padStart(2, "0");
    headerRow.appendChild(th);
  }

  tableHeader.appendChild(headerRow);

  headerRow.querySelectorAll("th").forEach((th, index) => {
    th.addEventListener("click", () => {
      if ((index >= 1 && index <= 35) || index === 36) {
        const type = th.dataset.type;
        const value = th.dataset.value;
        sortTable(index, type, value);
      }
    });
  });

  const g1Used = (typeof g1 !== "undefined" ? g1 : window.g1 || []).map((n) =>
    n.toString().padStart(2, "0")
  );
  const g2Used = (typeof g2 !== "undefined" ? g2 : window.g2 || []).map((n) =>
    n.toString().padStart(2, "0")
  );

  sortedData.forEach((item, index) => {
    const row = document.createElement("tr");

    const indexTd = document.createElement("td");
    indexTd.textContent = numToChinese(index + 1);
    row.appendChild(indexTd);

    for (let i = 1; i <= 35; i++) {
      const numStr = i.toString().padStart(2, "0");
      const cell = document.createElement("td");
      cell.textContent = item.numbers1To35.includes(numStr) ? numStr : "";
      if (g1Used.includes(numStr)) cell.classList.add("highlight");
      row.appendChild(cell);
    }

    const hashTd = document.createElement("td");
    hashTd.textContent = item.isDoubleHash
      ? `,,${item.countBeforeHash}`
      : `,${item.countBeforeHash}`;
    if (item.isDoubleHash) hashTd.classList.add("purple-highlight");
    row.appendChild(hashTd);

    for (let i = 1; i <= 12; i++) {
      const numStr = i.toString().padStart(2, "0");
      const cell = document.createElement("td");
      cell.textContent = item.numbers1To12.includes(numStr) ? numStr : "";
      if (g2Used.includes(numStr)) cell.classList.add("red");
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });
}

function sortTable(columnIndex, columnType, columnValue) {
  let sortedData = [...parsedData];
  if (columnType === "hash") {
    sortedData.sort((a, b) => b.countBeforeHash - a.countBeforeHash);
  } else if (columnType === "number") {
    sortedData.sort((a, b) => {
      const hasA = a.numbers1To35.includes(columnValue);
      const hasB = b.numbers1To35.includes(columnValue);
      if (hasA && !hasB) return -1;
      if (!hasA && hasB) return 1;
      return b.countBeforeHash - a.countBeforeHash;
    });
  }
  renderTable(sortedData);
}

function loadIssueScript(issue) {
  document.getElementById("table-header").innerHTML = "";
  document.getElementById("table-body").innerHTML = "";

  const oldScript = document.querySelector("#his-script");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "his-script";
  script.src = basePath + issue.toString().padStart(3, "0") + ".js";
  script.onload = () => {
    document.title = "dlt" + issue.toString().padStart(3, "0");

    if (typeof window.ipt !== "string" || !window.ipt.trim()) {
      alert("ipt 数据加载失败或为空！");
      return;
    }

    ipt = normalizeIptFormat(window.ipt);
    ipt = sortByNumberCountBeforeHash(ipt);

    if (!ipt.trim()) return;

    parseData();
    renderTable();
  };

  document.body.appendChild(script);
}

window.addEventListener("DOMContentLoaded", () => {
  // 获取按钮元素
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const curBtn = document.getElementById("cur");

  curBtn.onclick = () => {
    current = defaultCur;
    loadIssueScript(current);
  };

  // 绑定按钮点击事件
  prevBtn.onclick = () => {
    if (current === 58) return;

    if (current > 1) {
      current--;
      loadIssueScript(current);
    }
  };

  nextBtn.onclick = () => {
    if (current === window.defaultCur) return;
    current++;
    loadIssueScript(current);
  };

  // 绑定键盘事件
  window.addEventListener("keydown", (event) => {
    // 上箭头键
    if (event.key === "ArrowUp" || event.keyCode === 38) {
      event.preventDefault(); // 阻止页面滚动
      prevBtn.click(); // 触发上一页按钮点击事件
    }
    // 下箭头键
    else if (event.key === "ArrowDown" || event.keyCode === 40) {
      event.preventDefault(); // 阻止页面滚动
      nextBtn.click(); // 触发下一页按钮点击事件
    }
  });

  // 加载初始内容
  loadIssueScript(current);
});

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("复制成功");
    return true;
  } catch (err) {
    console.error("复制失败:", err);
    return false;
  }
}

document.getElementById("copy")?.addEventListener("click", async () => {
  await copyToClipboard(ipt);
});
