const input = `
2 4 7 10 14 15 18 19 21 24 27 28 30 31 32 33 34 # 2 6
2 3 4 7 11 12 14 15 17 21 22 23 26 27 # 2 4 6
2 12 14 16 18 21 23 34 35 # 5 9 12
2 3 6 9 11 13 23 25 29 33 34 35 # 1 5 6
1 4 9 11 12 19 20 21 23 25 29 30 31 35 # 5 7 9
5 7 8 12 18 19 20 21 25 26 30 32 33 34 35 # 6 10
3 4 9 10 12 15 16 18 23 27 33 35 # 3 5 10 12
1 7 10 12 15 16 18 2 23 24 30 34 # 5 6 8 12
`;

    // 生成所有单式票组合
    function generateSingleTickets(input) {
      const allTickets = [];
      
      input.trim().split('\n').forEach(line => {
        const [frontPart, backPart] = line.split('#').map(part => part.trim());
        
        // 获取有效数字（前区1-35，后区1-12）
        const frontNumbers = [...new Set(
          frontPart.split(/\s+/)
            .map(Number)
            .filter(n => n >= 1 && n <= 35)
        )];
        const backNumbers = [...new Set(
          backPart.split(/\s+/)
            .map(Number)
            .filter(n => n >= 1 && n <= 12)
        )];
        
        // 生成前区组合（C(n,5)）
        const frontCombinations = getCombinations(frontNumbers, 5);
        // 生成后区组合（C(m,2)）
        const backCombinations = getCombinations(backNumbers, 2);
        
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

    // 组合生成函数（从数组 arr 中选 k 个数的所有组合）
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
        front: Array(36).fill(0), // 前区 1-35
        back: Array(13).fill(0)   // 后区 1-12
      };
      
      tickets.forEach(ticket => {
        ticket.front.forEach(num => stats.front[num]++);
        ticket.back.forEach(num => stats.back[num]++);
      });
      
      return stats;
    }

    // 根据统计数据生成数组，每个对象包含 号码、出现次数、出现比例
    function generateStatsArray(data, range, totalTickets) {
      const result = [];
      for (let i = 1; i <= range; i++) {
        if (data[i] > 0) {
          let percentage = ((data[i] / totalTickets) * 100).toFixed(1) + "%";
          result.push({
            "号码": i.toString().padStart(2, "0"),
            "出现次数": data[i],
            "出现比例": percentage
          });
        }
      }
      // 按出现次数降序排列
      return result.sort((a, b) => b["出现次数"] - a["出现次数"]);
    }

    // 生成 HTML 表格
    function createHTMLTable(dataArray, title) {
      let html = `<h2>${title} 出现次数及比例（单式统计）</h2>`;
      html += `<table><thead><tr><th>号码</th><th>出现次数</th><th>出现比例</th></tr></thead><tbody>`;
      dataArray.forEach(item => {
        html += `<tr><td>${item["号码"]}</td><td>${item["出现次数"]}</td><td>${item["出现比例"]}</td></tr>`;
      });
      html += `</tbody></table>`;
      return html;
    }

    // 执行转换与统计
    const singleTickets = generateSingleTickets(input);
    const stats = countSingleTickets(singleTickets);

    const totalTickets = singleTickets.length;
    const frontStatsArray = generateStatsArray(stats.front, 35, totalTickets);
    const backStatsArray = generateStatsArray(stats.back, 12, totalTickets);

    // 将结果塞入 HTML 中
    document.getElementById("front-table").innerHTML = createHTMLTable(frontStatsArray, "前区");
    document.getElementById("back-table").innerHTML = createHTMLTable(backStatsArray, "后区");
    document.getElementById("total").innerHTML = `<p>共生成 ${totalTickets} 注单式票</p>`;
