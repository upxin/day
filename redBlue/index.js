const { arr } = require('./his');

const frequency = {};

// 计算每个数字的出现频率
arr.forEach(item => {
  const nums = item.split(',').slice(0, 6);
  nums.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
  });
});

// 将频率排序（频率从低到高）
const sortedNumbers = Object.keys(frequency).sort((a, b) => frequency[a] - frequency[b]);

// 提取最近两期的前六个数字
const recentNumbers = arr.slice(0, 2).map(item => item.split(',').slice(0, 6));

// 检查生成的数字是否与最近两期的数字有重复
const hasOverlapWithRecent = (numbers) => {
  return recentNumbers.some(recent => recent.some(num => numbers.includes(num)));
};

const generatePredictions = (sortedMain, sortedSpecial) => {
  const predictions = [];
  while (predictions.length < 10) {
    const mainNumbers = new Set();
    while (mainNumbers.size < 6) {
      const randomIndex = Math.floor(Math.random() * sortedMain.length);
      mainNumbers.add(sortedMain[randomIndex]);
    }
    const mainNumbersArray = [...mainNumbers].sort((a, b) => a - b);
    if (!hasOverlapWithRecent(mainNumbersArray)) {
      const specialIndex = Math.floor(Math.random() * sortedSpecial.length);
      predictions.push(mainNumbersArray.join(',') + ' | ' + sortedSpecial[specialIndex]);
    }
  }
  return predictions;
};

// 选择前面的频率较低的号码
const specialNumbers = arr.map(item => item.split(',')[6]).filter((value, index, self) => self.indexOf(value) === index);
const predictions = generatePredictions(sortedNumbers, specialNumbers);

console.log(predictions);
