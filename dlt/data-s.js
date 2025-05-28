function splitCombinations(input) {
  const lines = input.trim().split("\n");
  const result = [];

  for (const line of lines) {
    if (!line.trim()) continue; // 跳过空行

    const [mainPart, commentPart] = line.split("#").map((part) => part.trim());
    if (!commentPart) {
      result.push(line); // 没有注释部分的行保持原样
      continue;
    }

    const numbers = commentPart
      .split(/\s+/)
      .map(Number)
      .filter(Number.isFinite);

    if (numbers.length <= 2) {
      result.push(line); // 不足3个数字的行保持原样
    } else {
      // 生成所有可能的2个数字的组合
      for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
          result.push(`${mainPart} # ${numbers[i]} ${numbers[j]}`);
        }
      }
    }
  }

  return result.join("\n");
}

ipt = splitCombinations(ipt);
console.log("iptS=====");
console.log(ipt);
