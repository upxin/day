// 历史数据
let historyData = []

// 初始化一个对象来存储每个数字的出现次数
const frequency = {};

// 遍历历史数据，统计每个数字的出现次数
historyData.forEach(group => {
  const numbers = group.split(',');
  numbers.forEach(number => {
      if (frequency[number]) {
          frequency[number]++;
      } else {
          frequency[number] = 1;
      }
  });
});

// 获取所有数字的列表
const allNumbers = Array.from({ length: 80 }, (_, i) => (i + 1).toString().padStart(2, '0'));

// 计算每个数字的权重（出现次数的倒数）
const weights = allNumbers.map(number => {
  return {
      number,
      weight: 1 / (frequency[number] || 1)
  };
});

// 根据权重随机选择20个数字
function weightedRandomSelection(weights, count) {
  const selectedNumbers = [];
  const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);

  for (let i = 0; i < count; i++) {
      let random = Math.random() * totalWeight;
      for (const item of weights) {
          if (random < item.weight) {
              selectedNumbers.push(item.number);
              break;
          }
          random -= item.weight;
      }
  }

  return selectedNumbers;
}

const predictedNumbers = []
for (const _ of new Array(10)) {
  const item =  weightedRandomSelection(weights, 10);
  predictedNumbers.push(item.join(','))
}
// 输出结果
console.log(predictedNumbers);
