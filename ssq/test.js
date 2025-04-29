function generateDoubleColorBallNumbers() {
  // 生成红球号码
  const redBalls = [];
  while (redBalls.length < 6) {
    const num = Math.floor(Math.random() * 33) + 1;
    if (!redBalls.includes(num)) {
      redBalls.push(num);
    }
  }
  // 对红球号码进行排序
  redBalls.sort((a, b) => a - b);

  // 生成蓝球号码
  const blueBall = Math.floor(Math.random() * 16) + 1;

  return {
    redBalls: redBalls,
    blueBall: blueBall,
  };
}

// 调用函数生成号码
const result = generateDoubleColorBallNumbers();

// 打印结果
console.log(`红球号码: ${result.redBalls.join(" ")}`);
console.log(`蓝球号码: ${result.blueBall}`);
