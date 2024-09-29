var tdTags = document.querySelectorAll('td.kjhm');

// 存储结果的数组
var numbersList = [];

// 遍历每个<td>标签
tdTags.forEach(function (td) {
  // 找到所有<span>标签并提取号码
  var spans = td.querySelectorAll('span.jqh');
  var numbers = Array.from(spans).map(function (span) {
    return span.textContent;
  });
  // 将号码拼成字符串，用逗号隔开
  var numbersStr = numbers.join(',');
  // 将结果添加到数组中
  numbersList.push(numbersStr);
});

// 输出结果
console.log(numbersList);
