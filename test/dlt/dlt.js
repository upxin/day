const input = `
 2 3 4  8  10  13  14  15 18 21 23 24 27 28 29 32 34     # 2 5
 3  4  5  7  9  15  17  18  23 27  28  32               # 2  4   9  11
 1  5  8  12  16  17  18  22  23  25  30  33              #  4  6  9  11
 2  5  6 7  8  11  13  17  20  26  29  30  31  33  #  4  8  11
 1  3  5  8  15  16  19  23  25                     # 1  9  11
 1  2  7  12  17  18  20  22  25  27  30  35        #  5  8  9
 1  2  5  6  11  12  13  19  20  23  30  31         #  4  8  9
 1  7  10  18  22  29  30                     # 1  7  12
 6 7 12  15  16  18  19  21  22  25  27 30 34  # 2  5  11
 5  15  16  18  21 22  23  29  30   34     #  1  9  12
 4  5  6  13  17  21  22  23  27  29  30   31  # 1  4  11  12
 10 11  12  14  15  25  27  28 31 35 # 4 11
 2  3  4   9  10  11  19  20  21  32  33   34
 5  8  13 21  33  34  # 5 7
 6  8  17 19  21  34  # 5 7
 1 2 18 20 21 22 32 33  # 4 5 12
 3 8 15 18 21 26 31 35  # 4 8 12
 7 8 10 11 13 14 19 24 26 29 30 # 1 6 8 11
 1 6 7 8 13 18 19 21 22 26 27 29 30 31 34 # 1 10 11
 1 4 7 12 13 20 22 26 27 29 33 # 2 9  12
 4 5 9 11 16 17 21 22 27 28 29 # 2 3 4 5
 2 3 4 6 7 8 9 11 13 22 27 29 32 # 3 7 11
    `;

      // 统计前区和后区号码出现次数
      function countNumbers(input) {
        let frontCounts = {};
        let backCounts = {};
        let lines = input.trim().split("\n");
        let totalLines = lines.length;
        lines.forEach((line) => {
          let parts = line.split("#").map((part) => part.trim());
          let frontPart = parts[0];
          let backPart = parts[1];
          if (frontPart) {
            frontPart
              .split(/\s+/)
              .map(Number)
              .forEach((num) => {
                frontCounts[num] = (frontCounts[num] || 0) + 1;
              });
          }
          if (backPart) {
            backPart
              .split(/\s+/)
              .map(Number)
              .forEach((num) => {
                backCounts[num] = (backCounts[num] || 0) + 1;
              });
          }
        });
        return { frontCounts, backCounts, totalLines };
      }

      // 按出现次数分组，返回数组格式 [[出现次数, [号码列表]], ...]
      function groupByFrequency(counts) {
        let freqMap = {};
        Object.entries(counts).forEach(([num, count]) => {
          if (!freqMap[count]) {
            freqMap[count] = [];
          }
          freqMap[count].push(num);
        });
        // 按出现次数降序排序
        return Object.entries(freqMap).sort((a, b) => b[0] - a[0]);
      }

      // 创建表格HTML
      function createTable(groupedData, totalLines, title) {
        let html = "<h2>" + title + "出现次数分布</h2>";
        html +=
          "<table><thead><tr><th>出现次数</th><th>号码列表</th><th>出现率</th></tr></thead><tbody>";
        groupedData.forEach(([count, nums]) => {
          let percentage = ((count / totalLines) * 100).toFixed(1) + "%";
          html +=
            "<tr><td>" +
            count +
            " 次</td><td>" +
            nums.join(", ") +
            "</td><td>" +
            percentage +
            "</td></tr>";
        });
        html += "</tbody></table>";
        return html;
      }

      const { frontCounts, backCounts, totalLines } = countNumbers(input);
      const groupedFront = groupByFrequency(frontCounts);
      const groupedBack = groupByFrequency(backCounts);
      document.getElementById("front-table").innerHTML = createTable(
        groupedFront,
        totalLines,
        "前区"
      );
      document.getElementById("back-table").innerHTML = createTable(
        groupedBack,
        totalLines,
        "后区"
      );
      document.getElementById("total").innerHTML =
        "<p>共统计 " + totalLines + " 组复式票</p>";
