function generateRandomNumbers() {
  // Helper function to generate a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper function to shuffle an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Existing sets of numbers
  const arr = [
    '01,15,20,22,31,32,03',
    '03,10,11,19,27,28,07',
    '07,11,18,24,27,32,04',
  ];

  // Convert existing sets to arrays of numbers
  const existingSets = arr.map(str => str.split(',').map(Number));

  while (true) {
    // Generate a set of 6 unique random numbers from 1 to 33
    const numbers = Array.from({ length: 33 }, (_, i) => i + 1);
    shuffle(numbers);
    const randomSix = numbers.slice(0, 6).sort((a, b) => a - b);

    // Generate a random number from 1 to 16
    const randomOne = getRandomInt(1, 16);

    // Check if the generated set meets the condition
    let isValid = true;
    for (const set of existingSets) {
      const existingSix = set.slice(0, 6);
      const commonNumbers = randomSix.filter(num => existingSix.includes(num));
      if (commonNumbers.length > 2) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      // Format the result as a string
      const result = [...randomSix, randomOne].map(num => String(num).padStart(2, '0')).join(',');
      return result;
    }
  }
}

let num = 10
let list  = []
while(num) {
  list.push(generateRandomNumbers())
  num--
}

console.log(list);
