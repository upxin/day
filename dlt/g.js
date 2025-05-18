function sortByNumberCountBeforeHash(input) {
  const lines = input.trim().split("\n");
  const linesWithCount = lines.map((line) => {
    // 分离数字部分和注释部分
    let numbersPart = "";
    let commentPart = "";
    const hashIndex = line.indexOf("#");
    if (hashIndex !== -1) {
      numbersPart = line.slice(0, hashIndex).trim();
      commentPart = line.slice(hashIndex).trim();
    } else {
      numbersPart = line.trim();
    }

    // 处理数字部分，去掉小于 10 且前面带 0 的数字的 0
    const processedNumbersPart = numbersPart
      .split(" ")
      .map((num) => {
        if (/^0\d$/.test(num) && parseInt(num, 10) < 10) {
          return num.slice(1);
        }
        return num;
      })
      .join(" ");

    // 处理注释部分，去掉小于 10 且前面带 0 的数字的 0
    const processedCommentPart = commentPart
      .split(" ")
      .map((num) => {
        if (/^0\d$/.test(num) && parseInt(num, 10) < 10) {
          return num.slice(1);
        }
        return num;
      })
      .join(" ");

    const newLine =
      processedNumbersPart +
      (processedCommentPart ? ` ${processedCommentPart}` : "");
    return { line: newLine, count: processedNumbersPart.split(" ").length };
  });

  linesWithCount.sort((a, b) => b.count - a.count);
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

// 调用方法并输出结果
const sortedIpt = sortByNumberCountBeforeHash(ipt);
console.log(sortedIpt);
const g1 = [3,12,16,21,29];
const g2 = [1,2];
// rt
