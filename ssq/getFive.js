// 初始的有效组合数据
const { validCombos } = require("./all040.js");

let targetLen = 5; // 选择的数
let maxRepeat = 4; // 每条重复次数
let rCount = 20; // 重复条数

// 必须包含的数字数组
let mustInclude = [8, 10];
// 不能包含的数字数组
let mustExclude = [17, 15];

// 洗牌算法（Fisher - Yates）
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 生成一组满足条件的数据
function generateValidData() {
  const maxAttempts = 1000; // 最大尝试次数，避免无限循环
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // 生成 1 - 33 的数字数组，排除必须排除的数字
    const numbers = Array.from({ length: 33 }, (_, i) => i + 1).filter(
      (num) => !mustExclude.includes(num)
    );
    // 使用洗牌算法打乱数组顺序
    const shuffledNumbers = shuffle(numbers);

    // 先将必须包含的数字放入新数据
    let newData = [...mustInclude];

    // 从洗牌后的数组中选取剩余的数字
    for (const num of shuffledNumbers) {
      if (!newData.includes(num)) {
        newData.push(num);
        if (newData.length === targetLen) {
          break;
        }
      }
    }

    // 检查新数据长度是否满足要求
    if (newData.length !== targetLen) {
      continue;
    }

    // 检查重复数最大为 5 的重复条数是否小于 4 条
    let count = 0;

    for (const combo of validCombos) {
      let repeatCount = 0;
      for (const num of newData) {
        if (combo.includes(num)) {
          repeatCount++;
        }
      }
      if (repeatCount === maxRepeat) {
        count++;
      }
    }

    if (count < rCount) {
      return newData;
    }
  }

  console.log("在最大尝试次数内未能生成满足条件的数据。");
  return null;
}

const result = generateValidData()?.sort?.((a, b) => a - b);
console.log(result.join(' '));
