const fs = require('fs');

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

// 生成全量组合（1-35选3）修改点1
const allNumbers = Array.from({ length: 35 }, (_, i) => i + 1);
const allCombinations = generateCombinations(allNumbers, 3); // 4→3

// 读取用户已有组合（假设已生成my3.js）修改点2
const userCombinations = require('./my3.js'); // 4→3

// 创建快速查找的Set
const userSet = new Set(userCombinations.map(comb => comb.join(',')));

// 过滤剩余组合
const restCombinations = allCombinations.filter(comb => {
    return !userSet.has(comb.join(','));
});

// 格式化输出
const formattedRest = restCombinations.map(comb => 
    `  [${comb.join(',')}]`
).join(',\n');

// 写入文件
const exportContent = `module.exports = [\n${formattedRest}\n];`;
fs.writeFileSync('rest3.js', exportContent); // 修改点3

console.log('剩余组合已保存到 rest3.js');
