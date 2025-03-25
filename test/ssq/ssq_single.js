const fs = require('fs');

// 输入数据（#分隔前后区）
const input = `
4 7 8 11 12 14 16 18 19 21 25 26 9 31 32 # 10
1 7 8 11 12 14 16 18 19 21 25 26 9 31 32 # 12 2
`;

// 生成所有单式票组合
function generateSingleTickets(input) {
  const allTickets = [];
  
  input.trim().split('\n').forEach(line => {
    const [frontPart, backPart] = line.split('#').map(part => part.trim());
    
    // 获取有效数字
    const frontNumbers = [...new Set(frontPart.split(/\s+/).map(Number).filter(n => n >= 1 && n <= 33))];
    const backNumbers = [...new Set(backPart.split(/\s+/).map(Number).filter(n => n >= 1 && n <= 16))];
    
    // 生成前区组合（C(n,6)）
    const frontCombinations = getCombinations(frontNumbers, 6);
    // 生成后区组合（C(m,1)）
    const backCombinations = getCombinations(backNumbers, 1);
    
    // 组合前后区
    frontCombinations.forEach(front => {
      backCombinations.forEach(back => {
        allTickets.push({
          front: front.sort((a, b) => a - b),
          back: back.sort((a, b) => a - b)
        });
      });
    });
  });
  
  return allTickets;
}

// 组合生成函数
function getCombinations(arr, k) {
  const result = [];
  function backtrack(start, path) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      path.push(arr[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}

// 统计单式票号码出现次数
function countSingleTickets(tickets) {
  const stats = {
    front: Array(34).fill(0), // 前区1-33
    back: Array(17).fill(0)   // 后区1-16
  };
  
  tickets.forEach(ticket => {
    ticket.front.forEach(num => stats.front[num]++);
    ticket.back.forEach(num => stats.back[num]++);
  });
  
  return stats;
}

// 执行转换与统计
const singleTickets = generateSingleTickets(input);
const stats = countSingleTickets(singleTickets);

// 打印结果（按出现次数降序）
function printStats(data, name, range) {
  const result = [];
  for (let i = 1; i <= range; i++) {
    if (data[i] > 0) result.push({ 号码: i, 出现次数: data[i] });
  }
  console.log(`\n===== ${name}号码出现次数（单式统计） =====`);
  console.table(result.sort((a, b) => b.出现次数 - a.出现次数));
}

printStats(stats.front, '前区', 33);
printStats(stats.back, '后区', 16);

// 导出单式票（可选）
const ticketStrings = singleTickets.map(t => 
  `${t.front.join(',')}#${t.back.join(',')}`
);
// fs.writeFileSync('双色球单式票.txt', ticketStrings.join('\n'));

console.log(`\n共生成 ${singleTickets.length} 注单式票，已保存到文件`);
console.log('示例:', ticketStrings.slice(0, 3).join('\n'));
