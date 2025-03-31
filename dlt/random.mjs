import { ipt } from "./t033.mjs";
// const ipt = `
// 2 3 6 7 8 11 13 15 16 19 21 23 25 30 31 32 33 34 # 6 9
// 3 6 7 10 12 15 16 17 19 24 27 30 31 34 # 5 8`;
// 为什么 33总出不来  探索一下原因
// 找到原因了  33在后面 生成的数字是从前面开始遍历计算count的  很容易导致遍历不到后面的数字就已经符合条件了
// 需要找倒序再生成一次  防止丢失后面的数字
const ig = [];
const mustBe = [8, 10, 33];
const repeat = 3;
const len = 8;
const runTime = new Array(3);
function generateNumbers(ipt) {
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

  function getRandomNumbers() {
    const numbers = [...mustBe];
    while (numbers.length < len) {
      const num = Math.floor(Math.random() * 35) + 1;
      if (!numbers.includes(num) && !ig.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  }

  let result;
  do {
    result = getRandomNumbers();
  } while (!isValidCombination(result));

  return result.sort((a, b) => a - b).join(",");
}

const output = [];
for (const element of runTime) {
  output.push(generateNumbers(ipt).split(","));
}

console.log(output);
let all = new Set();
for (const element of output) {
  for (const num of element) {
    all.add(num);
  }
}
console.log(
  Array.from(all)
    .sort((a, b) => a - b)
    .join(",")
);
