import { validCombos } from "./all32.mjs";
function getValidCombinations(validCombos, filterArray, maxResults = 10) {
  // 1. 预处理：生成可用数字（1-35，排除过滤项）
  const numericFilter = filterArray.map(Number);
  const available = Array.from({ length: 35 }, (_, i) => i + 1).filter(
    (num) => !numericFilter.includes(num)
  );

  // 2. 预处理validCombos为Set数组（快速冲突检查）
  const validComboSets = validCombos.map((combo) => new Set(combo));

  // 3. 生成结果（最多尝试10万次避免死循环）
  const results = [];
  const maxAttempts = 100000;
  let attempts = 0;

  while (results.length < maxResults && attempts < maxAttempts) {
    attempts++;

    // 随机生成候选组合
    const candidate = getRandomCombination(available, 5);
    const sorted = candidate.sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[4];
    const sum = sorted.reduce((a, b) => a + b, 0);

    // 检查基础条件
    if (max - min <= 16 || sum <= 128) continue;

    // 检查与validCombos的冲突
    let isValid = true;
    for (const vcSet of validComboSets) {
      let common = 0;
      for (const num of candidate) {
        if (vcSet.has(num)) common++;
        if (common > 3) break;
      }
      if (common > 3) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      results.push(sorted);
    }
  }

  return results.slice(0, maxResults);
}

// 辅助函数：从数组中随机选k个不重复元素
function getRandomCombination(arr, k) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, k);
}

const filterArray = [1, 34, 35];

console.log(getValidCombinations(validCombos, filterArray, 10));
