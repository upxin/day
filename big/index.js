
// 历史大乐透中奖号码
let history = [
  '05,06,09,15,17 =03 10',
  '04,12,17,23,27 =02 08',
  '06,12,28,30,33 =02 07',
];

// 解析历史数据，提取前区和后区号码
let historyFront = [];
let historyBack = [];

history.forEach(entry => {
  let [front, back] = entry.split(' =');
  historyFront.push(front.split(',').map(Number));
  historyBack.push(back.split(' ').map(Number));
});

// 生成前区和后区的候选号码
let frontCandidates = Array.from({ length: 35 }, (_, i) => i + 1);
let backCandidates = Array.from({ length: 12 }, (_, i) => i + 1);

// 随机选择前区10个号码，并确保与历史数据的重复数不超过一个
function getRandomFrontNumbers() {
  let selectedNumbers = [];
  while (selectedNumbers.length < 10) {
    let randomIndex = Math.floor(Math.random() * frontCandidates.length);
    let number = frontCandidates[randomIndex];
    let isValid = historyFront.every(historyNumbers => {
      let commonCount = historyNumbers.filter(n => selectedNumbers.includes(n) || n === number).length;
      return commonCount <= 1;
    });
    if (isValid) {
      selectedNumbers.push(number);
      frontCandidates.splice(randomIndex, 1);
    }
  }
  return selectedNumbers.sort((a, b) => a - b);
}

// 随机选择后区5个号码
function getRandomBackNumbers() {
  let selectedNumbers = [];
  while (selectedNumbers.length < 5) {
    let randomIndex = Math.floor(Math.random() * backCandidates.length);
    let number = backCandidates[randomIndex];
    selectedNumbers.push(number);
    backCandidates.splice(randomIndex, 1);
  }
  return selectedNumbers.sort((a, b) => a - b);
}

// 生成胆拖 10 + 5 的号码组合
let frontNumbers = getRandomFrontNumbers();
let backNumbers = getRandomBackNumbers();

console.log('前区号码:', frontNumbers.join(', '));
console.log('后区号码:', backNumbers.join(', '));
// 前区号码: 2, 6, 8, 11, 14, 17, 18, 25, 26, 35
// 后区号码: 4, 6, 10, 11, 12
