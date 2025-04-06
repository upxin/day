import { ipt } from "./034.mjs";
// const ipt = `
// 2 3 6 7 8 11 13 15 16 19 21 23 25 30 31 32 33 34 # 6 9
// 3 6 7 10 12 15 16 17 19 24 27 30 31 34 # 5 8`;
/**
 * 33期参考经验
 *
 * 为什么 33总出不来  探索一下原因经过运算 与统计
 * 数字次数出现的越多 越容易导致随机匹配不到这个数字
 * 比如33在统计中占比靠上了，但是它可以开出来，
 * 因为1 2 10这三个数字占比很低  已经拉低了赔率！
 * 哪怕有出现的次数多的数字 也不影响这个组合出现的次数少
 * 因为33可以被1 2 10之外的数字组合  降低len的长度有一定程度的缓解, 目前33 8这俩数字排名14 15位
 * 1 2 10 排名分别是31 28 19位。
 * 大票空缺明显的是10 8 6, 10 最明显 有两个大票空着出来，然后33是因为只有一个大票选了 其实其他大票没有怎么选择。
 *
 *
 *
 *
 *
 *
 *
 */

const ig = [1, 2, 3];
const mustBe = [17, 18];
const repeat = 4;
const len = 8;
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
