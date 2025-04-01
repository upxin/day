// import { ipt } from "./034.mjs";
const ipt = `1 2 4 8 11 15 16 18 19 21 23 26 27 30 32 33 # 6
1 2 4 7 10 12 15 17 19 20 21 24 26 27 29 32 # 13
`;

const ig = [];
const mustBe = [1, 6];
const repeat = 4;
const len = 9;
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

  function getRandomNumbers() {
    const numbers = [...mustBe];
    while (numbers.length < len) {
      const num = Math.floor(Math.random() * 33) + 1;
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
