const rows = document.querySelectorAll('tr');
const result = [];

rows.forEach(row => {
    // 选择所有 class 名包含 chartball 的元素（前缀匹配）
    const balls = row.querySelectorAll('[class^="chartball"]');
    const rowData = [];

    balls.forEach(ball => {
        rowData.push(ball.textContent.trim());
    });

    if (rowData.length > 0) {
        result.push(rowData);
    }
});

console.log(result);
