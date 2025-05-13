function sortByNumberCountBeforeHash(input) {
  const lines = input.trim().split("\n");
  const linesWithCount = lines.map((line) => {
    const parts = line.split("#");
    const numbersBeforeHash = parts[0].trim().split(" ").length;
    return { line, count: numbersBeforeHash };
  });
  linesWithCount.sort((a, b) => b.count - a.count);
  const sortedLines = linesWithCount.map((item) => item.line);
  const result = sortedLines.join("\n");
  copyToClipboard(result);
  return result;
}

async function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

// 调用方法并输出结果
const sortedIpt = sortByNumberCountBeforeHash(ipt);
const g1 = [2,4,11,29,30];
const g2 = [2,8];
