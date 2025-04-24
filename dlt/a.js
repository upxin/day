const data = require("./my3.js");
const fs = require("fs");

// 统计每一组跟其他组完全相同的次数
const countSame = [];
for (let i = 0; i < data.length; i++) {
  let sameCount = 0;
  for (let j = 0; j < data.length; j++) {
    if (i !== j) {
      // 检查两个数组是否完全相同
      const isSame = data[i].every((num, index) => num === data[j][index]);
      if (isSame) {
        sameCount++;
      }
    }
  }
  countSame.push({
    combination: data[i],
    sameCount: sameCount,
  });
}

// 只保留重复次数为 0 次的数据
const zeroRepeatData = countSame.filter((item) => item.sameCount === 0);

// 按相同次数倒序排列（这里倒序对于重复次数为 0 的数据其实没有实质意义，但保留逻辑结构）
zeroRepeatData.sort((a, b) => b.sameCount - a.sameCount);

// 打印结果
zeroRepeatData.forEach((item, index) => {
  console.log(
    `第 ${index + 1} 组 [${item.combination.join(
      ","
    )}] 与其他组完全相同的次数: ${item.sameCount}`
  );
});

// 导出结果到 output.js 文件
const output = `module.exports = ${JSON.stringify(zeroRepeatData, null, 2)};`;
fs.writeFile("output.js", output, (err) => {
  if (err) {
    console.error("写入文件时出错:", err);
  } else {
    console.log("结果已成功导出到 output.js");
  }
});
