const { ipt } = require("./040.js");

/**
 * 可以反着试试放两个认为最不可能开的  选的相对比较多的
 */

const ig = [];
const mustBe = [21];

const repeat = 2;
const len = 5;
const runTime = new Array(1);
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
  let times = 0;
  function getRandomNumbers() {
    const numbers = [...mustBe];
    while (numbers.length < len) {
      const num = Math.floor(Math.random() * 35) + 1;
      if (!numbers.includes(num) && !ig.includes(num)) {
        numbers.push(num);
      }
      times++;
      if (times % 10000000 === 0) {
        console.log(times);
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
