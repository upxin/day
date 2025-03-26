import { Worker, isMainThread, parentPort, workerData } from "worker_threads";
import { fileURLToPath } from "url";
import os from "os";
import { arr } from "./all.mjs";

const __filename = fileURLToPath(import.meta.url);

// 配置项
const DEFAULT_NUMBER_COUNT = 8;
const DEFAULT_MAX_OVERLAP = 3;
const excludeNumbers = [1,2,3,4,5,6,7,8,9,10,11,33];

if (isMainThread) {
  // 预处理阶段：将arr转换为Set数组
  const arrSets = arr.map((line) => {
    const nums = line.split(" ").map(Number);
    return new Set(nums);
  });

  const maxThreads = os.cpus().length;

  class HyperScheduler {
    constructor() {
      this.workers = new Set();
      this.found = false;
    }

    start() {
      for (let i = 0; i < maxThreads; i++) {
        const worker = new Worker(__filename);
        worker.on("message", (msg) => this.handleMessage(msg, worker));
        this.workers.add(worker);
        worker.postMessage({
          type: "task",
          data: {
            masks: arrSets,
            maxOverlap: DEFAULT_MAX_OVERLAP,
            excludeNumbers: excludeNumbers,
            numberCount: DEFAULT_NUMBER_COUNT,
          },
        });
      }
    }

    handleMessage(msg, worker) {
      if (this.found) return;
      if (msg.type === "result" && msg.data.length > 0) {
        this.found = true;
        this.workers.forEach((w) => w.terminate());
        console.log("推荐结果:\n" + msg.data[0].join(","));
        process.exit(0);
      }
    }
  }

  new HyperScheduler().start();
} else {
  let masks, maxOverlap, excludeNumbers, numberCount;

  parentPort.on("message", ({ type, data }) => {
    if (type === "task") {
      ({ masks, maxOverlap, excludeNumbers, numberCount } = data);
      parentPort.postMessage({ type: "result", data: generateNumbers() });
    }
  });

  // 生成随机数组合（优化版）
  const generateRandomNumbers = () => {
    const baseNumbers = Array.from({ length: 35 }, (_, i) => i + 1).filter(
      (num) => !excludeNumbers.includes(num)
    );
    const shuffled = [...baseNumbers];

    // Fisher-Yates 洗牌
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numberCount).sort((a, b) => a - b);
  };

  // 生成组合
  const generateCombinations = (array, size) => {
    const result = [];
    const current = [];
    const generate = (start) => {
      if (current.length === size) {
        result.push([...current]);
        return;
      }
      for (let i = start; i < array.length; i++) {
        current.push(array[i]);
        generate(i + 1);
        current.pop();
      }
    };
    generate(0);
    return result;
  };

  // 主生成逻辑
  const generateNumbers = () => {
    for (let attempt = 0; attempt < 100000; attempt++) {
      // 减少尝试次数
      const numbers = generateRandomNumbers();
      if (validateCombination(numbers)) {
        return [numbers];
      }
    }
    return [];
  };

  // 组合验证逻辑
  const validateCombination = (numbers) => {
    const combinations = generateCombinations(numbers, 5);
    for (const combo of combinations) {
      const comboSet = new Set(combo);
      for (const arrSet of masks) {
        let overlap = 0;
        for (const num of comboSet) {
          if (arrSet.has(num)) {
            if (++overlap > maxOverlap) {
              return false;
            }
          }
        }
      }
    }
    return true;
  };
}
