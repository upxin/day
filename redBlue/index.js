
const { his } = require('./his')
function generateRandomNumbers() {
  // 辅助函数：生成一个在 min 和 max 之间的随机整数（包含 min 和 max）
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 辅助函数：根据权重数组进行加权随机选择
  function weightedRandom(weights) {
    let totalWeight = weights.reduce((sum, weight) => sum + weight, 0); // 计算总权重
    let random = Math.random() * totalWeight;
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i + 1; // 返回对应的数字 (1-33 或 1-16)
      }
      random -= weights[i];
    }
  }

  // 解析历史数据并统计每个数字的出现次数

  // 初始化1到33的每个数字的出现次数
  const appearanceCount = Array(33).fill(0); // 1到33号数字，初始化为0

  // 初始化1到16的每个数字的出现次数（第7个号码）
  const extraAppearanceCount = Array(16).fill(0); // 1到16的数字，初始化为0

  // 遍历历史数据，统计前6个数字和第7个数字的出现次数
  his.forEach(str => {
    const numbers = str.split(',').map(Number);
    const mainNumbers = numbers.slice(0, 6); // 取前6个数字
    const extraNumber = numbers[6]; // 第7个数字

    // 统计前6个号码的出现次数
    mainNumbers.forEach(num => {
      appearanceCount[num - 1]++;
    });

    // 统计第7个号码（1到16）的出现次数
    extraAppearanceCount[extraNumber - 1]++;
  });

  // 基于历史出现次数生成权重：前6个数字，出现次数越少，权重越大
  const weights = appearanceCount.map(count => 1 / (count + 1)); // 1到33的权重

  // 基于历史数据生成1到16的权重：出现次数少，权重大
  const extraWeights = extraAppearanceCount.map(count => 1 / (count + 1)); // 1到16的权重

  // 获取上一期的中奖号码，即历史数据的第一条记录前6个数字
  const winningNumbers = his[0].split(',').slice(0, 6).map(Number); // 取前6个数字作为上一期号码

  // 生成符合条件的随机数
  while (true) {
    const selectedNumbers = new Set(); // 使用Set确保数字唯一

    // 随机生成10个1到33之间的数字
    while (selectedNumbers.size < 10) {
      const randomNumber = weightedRandom(weights); // 根据权重生成随机数
      selectedNumbers.add(randomNumber);
    }

    const randomTen = Array.from(selectedNumbers).sort((a, b) => a - b); // 排序生成的数字

    // 检查生成的随机数与上一期号码的重复数量，必须确保最多有2个重复
    const commonNumbers = randomTen.filter(num => winningNumbers.includes(num));

    // 只有当与上一期中奖号码重复的数字不超过2个时，才继续生成1到16的3个数字
    if (commonNumbers.length <= 2) {
      const selectedExtraNumbers = new Set();

      // 随机生成3个1到16之间的数字
      while (selectedExtraNumbers.size < 3) {
        const extraRandomNumber = weightedRandom(extraWeights); // 根据权重生成随机数
        selectedExtraNumbers.add(extraRandomNumber);
      }

      const randomThreeExtra = Array.from(selectedExtraNumbers).sort((a, b) => a - b); // 排序附加的数字

      // 返回两部分组合的结果：1到33的10个数字和1到16的3个数字
      return [randomTen, randomThreeExtra];
    }
  }
}

// 生成随机数
let randomSet = generateRandomNumbers();

// 输出生成的随机数组合
console.log(randomSet);
