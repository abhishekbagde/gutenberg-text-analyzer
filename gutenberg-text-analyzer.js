const https = require('https');

// Function to download the text from the URL
function downloadText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// function to count the occurrences of each starting letter in the text
function countStartingLetters(text) {
  const letterCounts = new Map();
  const words = text.toLowerCase().split(/\W+/);
  for (const word of words) {
    const startingLetter = word.charAt(0);
    if (letterCounts.has(startingLetter)) {
      letterCounts.set(startingLetter, letterCounts.get(startingLetter) + 1);
    } else {
      letterCounts.set(startingLetter, 1);
    }
  }
  return letterCounts;
}

// function to find the letter that starts the most words
function findMostCommonStartingLetter(letterCounts) {
  let maxCount = 0;
  let mostCommonLetter = '';
  for (const [letter, count] of letterCounts) {
    if (count > maxCount) {
      maxCount = count;
      mostCommonLetter = letter;
    }
  }
  return mostCommonLetter;
}

// main function
async function main() {
  const url = 'https://www.gutenberg.org/cache/epub/29364/pg29364.txt';
  const text = await downloadText(url);
  const letterCounts = countStartingLetters(text);
  console.log(letterCounts);
  const mostCommonLetter = findMostCommonStartingLetter(letterCounts);
  console.log(`The letter that starts the most words is: ${mostCommonLetter}`);
}

main();