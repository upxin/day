const input = `
4 7 8 11 12 14 16 18 19 21 25 26 9 31 32 # 10
2 7 9 15 16 18 21 22 25 26 29 # 2 3 6
3 4 7 13 14 17 20 24 27 30 # 4 5 7 8 10
1 10 11 15 19 22 24 28 29 31 # 9 11 16
1 3 10 14 17 19 20 24 32 # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
`;

// 初始化统计（双色球：前区1-33，后区1-16）
const stats = {
  front: Array(34).fill(0), // 前区1-33（索引0不用）
  back: Array(17).fill(0)   // 后区1-16（索引0不用）
};

// 统计函数（适配#分隔格式）
function countNumbers(input) {
  input.trim().split('\n').forEach(line => {
    const [frontPart, backPart] = line.split('#').map(part => part.trim());
    
    // 统计前区（取前6个有效数字）
    if (frontPart) {
      frontPart.split(/\s+/)
        .map(Number)
        .filter(n => n >= 1 && n <= 33)
        .slice(0, 6) // 确保只取6个前区号
        .forEach(num => stats.front[num]++);
    }
    
    // 统计后区（取第1个有效数字）
    if (backPart) {
      backPart.split(/\s+/)
        .map(Number)
        .filter(n => n >= 1 && n <= 16)
        .slice(0, 1) // 确保只取1个后区号
        .forEach(num => stats.back[num]++);
    }
  });
}

// 执行统计
countNumbers(input);

// 打印结果（按出现次数降序）
function printStats(data, name, range) {
  const result = [];
  for (let i = 1; i <= range; i++) {
    if (data[i] > 0) result.push({ 号码: i, 出现次数: data[i] });
  }
  console.log(`\n===== ${name}统计 =====`);
  console.table(result.sort((a, b) => b.出现次数 - a.出现次数));
}

printStats(stats.front, '前区', 33);
printStats(stats.back, '后区', 16);

// 验证输出
console.log('\n[示例验证]');
console.log('前区7号出现次数:', stats.front[7]);
console.log('后区10号出现次数:', stats.back[10]);
