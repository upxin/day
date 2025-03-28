import { validCombos } from "./all32.mjs";

// 生成 1 - 33 中 n 个数字的随机组合，考虑排除和必选数字
function generateRandomCombination(n, excludeNumbers, includeNumbers) {
  const numbers = [...includeNumbers];
  while (numbers.length < n) {
    const randomNumber = Math.floor(Math.random() * 33) + 1;
    if (
      !numbers.includes(randomNumber) &&
      !excludeNumbers.includes(randomNumber)
    ) {
      numbers.push(randomNumber);
    }
  }
  numbers.sort((a, b) => a - b);
  return numbers;
}

// 获取数组中指定长度的所有组合
function getCombinations(arr, n) {
  const result = [];
  function backtrack(start, currentCombination) {
    if (currentCombination.length === n) {
      result.push([...currentCombination]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      currentCombination.push(arr[i]);
      backtrack(i + 1, currentCombination);
      currentCombination.pop();
    }
  }
  backtrack(0, []);
  return result;
}

// 检查 8 个数字的所有 5 数字组合是否与已有组合重复
function is8NumberCombinationUnique(
  existingCombinationsSet,
  eightNumberCombination
) {
  const fiveNumberCombinations = getCombinations(eightNumberCombination, 5);
  for (const combination of fiveNumberCombinations) {
    const combinationStr = combination.join(",");
    if (existingCombinationsSet.has(combinationStr)) {
      return false;
    }
  }
  return true;
}

// 主函数，找出与已有组合不同的 8 数字组合
function findUnique8NumberCombination(
  validCombos,
  excludeNumbers,
  includeNumbers
) {
  const existingCombinationsSet = new Set(
    validCombos.map((combo) => combo.join(","))
  );

  let eightNumberCombination;
  do {
    eightNumberCombination = generateRandomCombination(
      9,
      excludeNumbers,
      includeNumbers
    );
    const isUnique = is8NumberCombinationUnique(
      existingCombinationsSet,
      eightNumberCombination
    );
    const hasDuplicates =
      new Set(eightNumberCombination).size !== eightNumberCombination.length;
    if (isUnique && !hasDuplicates) {
      break;
    }
  } while (true);

  return eightNumberCombination;
}

// 定义不能包含的数字和必须包含的数字
// 1,2,4,5,6,17,20,21,28  有46个4同
const excludeNumbers = [1, 2, 4, 5, 6, 17, 20, 21, 28];
const includeNumbers = [];

// 查找与已有组合不同的 8 数字组合
const unique8NumberCombination = findUnique8NumberCombination(
  validCombos,
  excludeNumbers,
  includeNumbers
);
console.log(unique8NumberCombination.join(","));
