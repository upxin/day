// 全局变量定义
import { ipt } from "./038.mjs";
let len = 10;
let repeat = 5;
const mustBe = [33, 16, 20];
const ig = [3, 5];

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
