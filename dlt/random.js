const { ipt } = require("./044.js");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const os = require("os");

const ig = [];
const mustBe = [17];
const repeat = 3;
const len = 8;

function generateNumbers(ipt) {
  const lines = ipt.split("\n").filter((line) => line.trim() !== "");
  const combinations = lines.map((line) => {
    const numbers = line
      .split("#")[0]
      .trim()
      .split(" ")
      .filter((num) => num !== "")
      .map(Number);
    return numbers;
  });

  function isValidCombination(combination) {
    for (const comb of combinations) {
      const commonCount = combination.filter((num) =>
        comb.includes(num)
      ).length;
      if (commonCount > repeat) {
        return false;
      }
    }
    return true;
  }
  let times = 0;
  function getRandomNumbers() {
    const numbers = [...mustBe];
    while (numbers.length < len) {
      const num = Math.floor(Math.random() * 35) + 1;
      if (!numbers.includes(num) && !ig.includes(num)) {
        numbers.push(num);
      }
      times++;
      if (times % 10000000 === 0) {
        console.log(times);
      }
    }
    return numbers;
  }

  let result;
  do {
    result = getRandomNumbers();
  } while (!isValidCombination(result));

  return result.sort((a, b) => a - b).join(",");
}

// 主线程逻辑
if (isMainThread) {
  const numThreads = os.cpus().length;
  const workers = [];
  let found = false;

  for (let i = 0; i < numThreads; i++) {
    const worker = new Worker(__filename, {
      workerData: {
        ipt: ipt,
      },
    });

    workers.push(worker);

    worker.on("message", (result) => {
      if (!found) {
        found = true;
        const output = result.split(",");
        console.log(output);

        let all = new Set();
        for (const num of output) {
          all.add(num);
        }
        console.log(
          Array.from(all)
            .sort((a, b) => a - b)
            .join(",")
        );

        // 终止其他线程
        workers.forEach((w) => {
          if (w !== worker) {
            w.terminate();
          }
        });
      }
    });

    worker.on("error", (err) => {
      console.error(`Worker error: ${err}`);
    });

    worker.on("exit", (code) => {
      if (code !== 0 && !found) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  }
} else {
  // 子线程逻辑
  const { ipt } = workerData;
  const result = generateNumbers(ipt);
  parentPort.postMessage(result);
}
