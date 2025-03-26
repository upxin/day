// main.mjs
// 使用 ESM 导入 fs 模块
import fs from "fs/promises";
// 导入 data.mjs 中导出的 ipt 数据
import { ipt } from "./s032.mjs";

// 选的号起码要保证中5个的球是存在的，不然这些号全都黑了 不太可能
const targetNumbers = [14, 16, 21, 10];

// 生成组合的函数
function getCombinations(arr, length) {
  const result = [];
  function backtrack(start, current) {
    if (current.length === length) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
}

// 解析输入数据，获取所有前区单式号码
function getAllSingleFrontTickets(input) {
  const lines = input.trim().split("\n");
  const singleTickets = [];
  for (let line of lines) {
    const [front] = line.split("#");
    const frontNumbers = front.trim().split(" ").map(Number);
    const frontCombinations = getCombinations(frontNumbers, 6);
    for (let frontComb of frontCombinations) {
      const singleTicketStr = frontComb.map(String).join(" ");
      singleTickets.push(singleTicketStr);
    }
  }
  return singleTickets;
}

// 计算两个数组中相同元素的数量
function countCommonElements(arr1, arr2) {
  let commonCount = 0;
  for (let num of arr1) {
    if (arr2.includes(num)) {
      commonCount++;
    }
  }
  return commonCount;
}

// 获取所有前区单式号码
const singleTickets = getAllSingleFrontTickets(ipt);

// 要检索的目标数据

const groupedTickets = {
  4: [],
  5: [],
  6: [],
};

singleTickets.forEach((ticket) => {
  const frontNumbers = ticket.split(" ").map(Number);
  const commonCount = countCommonElements(frontNumbers, targetNumbers);
  if (commonCount === 6 || commonCount === 5 || commonCount === 4) {
    if (!groupedTickets[commonCount]) {
      groupedTickets[commonCount] = [];
    }
    groupedTickets[commonCount].push(ticket);
  }
});

// 导出不同数量相同数字的组合到不同文件
async function exportGroupedTickets() {
  for (const [count, tickets] of Object.entries(groupedTickets)) {
    let dataString = `const Matches = [\n`;
    for (let ticket of tickets) {
      dataString += `  "${ticket}",\n`;
    }
    dataString += "];\n";
    try {
      await fs.writeFile(`${count}Matches.js`, dataString);
      console.log(
        `所有与目标数据有 ${count} 个相同数字的单式组合已导出到 ${count}Matches.js 文件中`
      );
    } catch (error) {
      console.error(`写入 ${count}Matches.js 文件时出错:`, error);
    }
  }

  // 导出所有前区5个数据
  let allFrontDataString = `export const arr = [\n`;
  for (let ticket of singleTickets) {
    allFrontDataString += `  "${ticket}",\n`;
  }
  allFrontDataString += "];\n";
  try {
    await fs.writeFile(`all.mjs`, allFrontDataString);
  } catch (error) {
    console.error(`写入 allFrontTickets.js 文件时出错:`, error);
  }
}

exportGroupedTickets();
