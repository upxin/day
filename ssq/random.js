// 全局变量定义
const { ipt } = require("./039.js");
// 通常在多组随机后的组合中一定有全部号码,通常以5-6次作为一个回合  然后把数字拿出来去杀号
// 注意观察那些号一直出现 那些偶然出现 他们很可能组合一起 
let len = 7;
let repeat = 4;
const mustBe = [15, 12, 17];
const ig = [1, 2, 3, 4, 5, 6];

function generateNumbers() {
  // 解析 ipt 数据
  const lines = ipt.split("\n").filter((line) => line.trim() !== "");
  const combinations = lines.map((line) => {
    const numbers = line
      .split("#")[0]
      .trim()
      .split(" ")
      .filter((num) => num !== "")
      .map(Number);
    return numbers;
  });

  // 检查组合是否有效
  function isValidCombination(combination) {
    for (const comb of combinations) {
      const commonCount = combination.filter((num) =>
        comb.includes(num)
      ).length;
      if (commonCount > repeat) {
        return false;
      }
    }
    return true;
  }

  // 使用洗牌算法生成随机数字组合
  function getRandomNumbers() {
    const allNumbers = Array.from({ length: 33 }, (_, i) => i + 1);
    // 排除必须排除的数字
    const filteredNumbers = allNumbers.filter((num) => !ig.includes(num));
    // 洗牌算法
    for (let i = filteredNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filteredNumbers[i], filteredNumbers[j]] = [
        filteredNumbers[j],
        filteredNumbers[i],
      ];
    }
    const numbers = [...mustBe];
    let index = 0;
    while (numbers.length < len) {
      const num = filteredNumbers[index];
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
      index++;
    }
    return numbers;
  }

  let result;
  do {
    result = getRandomNumbers();
  } while (!isValidCombination(result));

  return result.sort((a, b) => a - b);
}

const output = generateNumbers();
console.log(output.join(","));
