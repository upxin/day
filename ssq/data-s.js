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

    if (numbers.length <= 1) {
      result.push(line); // 只有0或1个数字的行保持原样
    } else {
      // 生成所有可能的n选1组合
      for (const num of numbers) {
        result.push(`${mainPart} # ${num}`);
      }
    }
  }

  return result.join("\n");
}
ipt = splitCombinations(ipt);
