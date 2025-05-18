function sortByNumberCountBeforeHash(input) {
  const lines = input.trim().split("\n");

  const linesWithCount = lines.map((line) => {
    // 改进的注释符号识别，考虑引号中的#
    let inQuote = false;
    let hashIndex = -1;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuote = !inQuote;
      }
      if (char === "#" && !inQuote) {
        hashIndex = i;
        break;
      }
    }

    // 分离数字部分和注释部分
    let numbersPart = "";
    let commentPart = "";

    if (hashIndex !== -1) {
      numbersPart = line.slice(0, hashIndex).trim();
      commentPart = line.slice(hashIndex).trim();
    } else {
      numbersPart = line.trim();
    }

    // 改进的数字部分处理，正确处理前导零
    const processedNumbersPart = numbersPart
      .split(/\s+/) // 使用正则表达式匹配任意空白字符，包括连续空格
      .map((num) => {
        // 只处理纯数字且有前导零的情况
        if (/^0\d+$/.test(num)) {
          return String(parseInt(num, 10));
        }
        return num;
      })
      .join(" ");

    // 改进的注释部分处理
    const processedCommentPart = commentPart
      .split(/\s+/)
      .map((token) => {
        // 只处理纯数字且有前导零的情况
        if (/^0\d+$/.test(token)) {
          return String(parseInt(token, 10));
        }
        return token;
      })
      .join(" ");

    const newLine =
      processedNumbersPart +
      (processedCommentPart ? ` ${processedCommentPart}` : "");

    return {
      line: newLine,
      count: processedNumbersPart.split(/\s+/).filter(Boolean).length,
    };
  });

  // 排序并处理相同计数的情况
  linesWithCount.sort((a, b) => {
    // 先按数字数量降序
    const countDiff = b.count - a.count;
    if (countDiff !== 0) return countDiff;

    // 数量相同则按原始行内容排序，保持一致性
    return a.line.localeCompare(b.line);
  });

  const sortedLines = linesWithCount.map((item) => item.line);
  const result = sortedLines.join("\n");
  copyToClipboard(result);
  return result;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("复制成功");
  } catch (err) {
    console.error("复制失败:", err);
  }
}
const sortedIpt = sortByNumberCountBeforeHash(ipt)
