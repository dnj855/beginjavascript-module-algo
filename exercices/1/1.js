import { log } from 'console';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url);
export const currentDirPath = dirname(currentFilePath);

function readFileContent(file) {
  const p = join(currentDirPath, file);
  const fileContent = fs.readFileSync(p).toString();
  return fileContent;
}

const findLargestSum = (file) => {
  const fileContent = readFileContent(file);
  const elves = fileContent.split('\n\n');
  let largestSum = 0;
  for (let i = 0; i < elves.length; i++) {
    const calories = elves[i].split('\n');
    let sum = 0;
    for (let j = 0; j < calories.length; j++) {
      sum += Number(calories[j]);
    }
    if (sum > largestSum) {
      largestSum = sum;
    }
  }
  return largestSum;
};

export const part1 = (file) => {
  return findLargestSum(file);
};

// À faire après
export const part2 = (file) => {
  // 🦁 Pour la partie 2, utilise la fonction ici
  return 0;
};

//Should be 24000 with data-test
console.log('Test part1', part1('./data-test.txt'));

//Should be 74394 with data
console.log('Test part1', part1('./data.txt'));

//Should be 45000 with data-test
console.log('Test part2', part2('./data-test.txt'));

//Should be 212836 with data
console.log('Test part2', part2('./data.txt'));
