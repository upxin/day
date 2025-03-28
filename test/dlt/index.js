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

// 使用示例
const arr = [1, 2, 3, 4];
const n = 2;
const combinations = getCombinations(arr, n);
console.log(combinations);
  