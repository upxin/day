(function () {
  const rows = document.querySelectorAll("tr[data-zhou]");
  const result = [];

  rows.forEach((row) => {
    const period = row.children[0].textContent.trim(); // 期号
    const date = row.children[1].textContent.trim(); // 日期

    // 红球：5个
    const redBalls = Array.from(row.querySelectorAll("td.kjhm span.jqh")).map(
      (span) => span.textContent.trim()
    );

    // 蓝球：2个
    const blueBalls = Array.from(row.querySelectorAll("td.kjhm span.jql")).map(
      (span) => span.textContent.trim()
    );

    result.push({
      period,
      date,
      redBalls,
      blueBalls,
    });
  });

  console.log(result);
  // 也可以下载为 JSON 文件：
  const blob = new Blob([JSON.stringify(result, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "dlt_data.json";
  a.click();
})();
