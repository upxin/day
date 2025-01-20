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
