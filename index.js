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
const n = 5;
const k = 2;

function cal(n, k) {
  debugger
  const len = n - k
  let rets = []
  let sum = 1
  for (let i = 0; i < len; i++) {
    let item = n-i
    rets.push(item)
  }
  for(let i = 0; i < rets?.length; i++) {
    sum*= rets[i]
  }
  return sum
}

console.log(cal(n, k));
console.log(combination(n, k));
