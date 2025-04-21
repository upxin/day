const fs = require("fs");
const { ipt } = require("./042.js");

function generateCombinations(arr, k) {
  const result = [];

  function combine(startIndex, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    for (let i = startIndex; i < arr.length; i++) {
      current.push(arr[i]);
      combine(i + 1, current);
      current.pop();
    }
  }

  combine(0, []);
  return result;
}

// 合并所有行的组合到单个二维数组
const result = ipt
  .trim()
  .split("\n")
  .flatMap((line) => {
    const [numbersPart] = line.split("#");
    const numbers = numbersPart.trim().split(/\s+/).map(Number);
    return generateCombinations(numbers, 3); // 修改这里
  });

// 自定义格式化输出
const formattedCombinations = result
  .map((comb) => `  [${comb.join(",")}]`)
  .join(",\n");

const exportContent = `module.exports = [\n${formattedCombinations}\n];`;

fs.writeFileSync("my3.js", exportContent); // 修改这里
console.log("组合已保存到 my3.js");
