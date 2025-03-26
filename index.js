function combination(n, k) {
  if (k > n) {
    return 0;
  }
  if (k === 0 || k === n) {
    return 1;
  }
  if (k > n - k) { // 由于 C(n, k) == C(n, n-k)
    k = n - k;
  }
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return result;
}
// 示例调用
const n = 10;
const k = 2;


console.log(combination(n, k));
// 1 3 4 8 9 17 18 19 20 23 24 25 26 27 31 
let arr = [1 ,6 ,15, 19, 21, 28 ,33 ,35]
