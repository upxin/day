import { validCombos } from "./all.mjs";
let commonThreshold = 4; // 最多相同的数字数量 只能是4 其他都不合理 测了很多次了

let size = 8; // 选复试
let maxResults = 1;

const filterArray = []; // 不要过滤  只能手动去筛选  因为过滤会导致这个数有的组合其他的数被干了

// 定义必须包含的数字数组
const requiredNumbers = [22, 25, 28]; // 最多只能加一个，否则不准了

function getValidCombinations(validCombos, filterArray) {
  // 1. 预处理：生成可用数字（1-35，排除过滤项）
  const numericFilter = filterArray.map(Number);
  const available = Array.from({ length: 35 }, (_, i) => i + 1).filter(
    (num) => !numericFilter.includes(num)
  );

  // 检查必须包含的数字是否在可用数字中，如果不在则移除
  const validRequiredNumbers = requiredNumbers.filter((num) =>
    available.includes(num)
  );

  // 2. 预处理validCombos为Set数组（快速冲突检查）
  const validComboSets = validCombos.map((combo) => new Set(combo));

  // 3. 生成结果（最多尝试10万次避免死循环）
  const results = [];
  const maxAttempts = 10000000;
  let attempts = 0;

  while (results.length < maxResults && attempts < maxAttempts) {
    attempts++;
    if (attempts % 100000 === 0) {
      console.log(`尝试次数: ${attempts}, 已找到结果数量: ${results.length}`);
    }

    // 随机生成候选组合，先放入必须包含的数字
    let candidate = [...validRequiredNumbers];

    // 计算还需要随机选取的数字个数
    const remainingCount = size - validRequiredNumbers.length;

    // 从可用数字中移除已经包含的必须数字
    const remainingAvailable = available.filter(
      (num) => !validRequiredNumbers.includes(num)
    );

    // 随机选取剩余的数字
    const randomPart = getRandomCombination(remainingAvailable, remainingCount);
    candidate = [...candidate, ...randomPart];

    const sorted = candidate.sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1]; // 因为size可能改变，所以取最后一个元素
    const sum = sorted.reduce((a, b) => a + b, 0);

    // 检查基础条件
    if (max - min <= 16 || sum <= 128) {
      continue;
    }

    // 检查与validCombos的冲突
    let isValid = true;
    for (const vcSet of validComboSets) {
      let common = 0;
      for (const num of candidate) {
        if (vcSet.has(num)) common++;
        if (common > commonThreshold) break;
      }
      if (common > commonThreshold) {
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

const ret = getValidCombinations(validCombos, filterArray);
let o = [];
for (const element of ret) {
  o.push(...element);
}
let f = Array.from(new Set(o)).sort((a, b) => a - b);

console.log(ret);
console.log(f.join(", "));
