function getRed() {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNumber = Math.floor(Math.random() * 33) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers.sort((a, b) => a - b).join('-');
}

function getBlue() {
  const randomNumber = Math.floor(Math.random() * 16) + 1;
  return '-'+ randomNumber
}


const obj = []
for (let index = 0; index < 100; index++) {
  const element = getRed() + getBlue()
  obj.push(element)
}
console.log(obj)
