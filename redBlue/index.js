
function getRandomNumbers() {
  const his = [
    [2, 3, 4, 6, 11, 15],
    [3, 12, 14, 16, 29, 32],
    [1, 15, 20, 22, 31, 32]
  ];

  // 去掉第一组数据中的数字
  const firstGroup = new Set(his[0]);
  const remainingNumbers = Array.from({ length: 33 }, (_, i) => i + 1).filter(num => !firstGroup.has(num));

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function isValidSelection(selection, history) {
    const allHistoryNumbers = new Set(history.flat());
    const commonNumbers = selection.filter(num => allHistoryNumbers.has(num));
    return commonNumbers.length <= 1;
  }

  function selectNumbers() {
    let selectedNumbers;
    do {
      // 随机选择15个数字
      selectedNumbers = [];
      while (selectedNumbers.length < 15) {
        const randomIndex = getRandomInt(remainingNumbers.length);
        const randomNumber = remainingNumbers[randomIndex];
        if (!selectedNumbers.includes(randomNumber)) {
          selectedNumbers.push(randomNumber);
        }
      }
    } while (!isValidSelection(selectedNumbers, his.slice(1)));

    // 对结果进行排序
    selectedNumbers.sort((a, b) => a - b);

    return selectedNumbers;
  }

  // 连续选20次
  const results = [];
  for (let i = 0; i < 20; i++) {
    results.push(selectNumbers());
  }

  // 统计每个数字出现的次数
  const numberCounts = {};
  results.flat().forEach(num => {
    numberCounts[num] = (numberCounts[num] || 0) + 1;
  });

  // 取出现次数最多的11个数字
  const mostFrequentNumbers = Object.entries(numberCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 11)
    .map(entry => parseInt(entry[0]));
// 取出现次数最少的11个数字

  const leastFrequentNumbers = Object.entries(numberCounts)
  .sort((a, b) => a[1] - b[1])
  .slice(0, 11)
  .map(entry => parseInt(entry[0]));
  
  return mostFrequentNumbers;
}

console.log(getRandomNumbers());
