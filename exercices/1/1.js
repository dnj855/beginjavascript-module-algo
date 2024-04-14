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
  let largestSum = elves.reduce((acc, elve) => {
    const calories = elve.split('\n');
    let sum = calories.reduce((acc2, calorie) => {
      return acc2 + Number(calorie);
    }, 0);
    return sum > acc ? sum : acc;
  }, 0);
  return largestSum;
};

const findSumOfThreeLargest = (file) => {
  const fileContent = readFileContent(file);
  const elves = fileContent.split('\n\n');

  const sorted = elves
    .map((elve) => {
      const calories = elve.split('\n');
      return calories.reduce((sum, calorie) => sum + Number(calorie), 0);
    })
    .sort((a, b) => b - a);
  return sorted[0] + sorted[1] + sorted[2];
};

export const part1 = (file) => {
  return findLargestSum(file);
};

// À faire après
export const part2 = (file) => {
  return findSumOfThreeLargest(file);
};

//Should be 24000 with data-test
console.log('Test part1', part1('./data-test.txt'));

//Should be 74394 with data
console.log('Test part1', part1('./data.txt'));

//Should be 45000 with data-test
console.log('Test part2', part2('./data-test.txt'));

//Should be 212836 with data
console.log('Test part2', part2('./data.txt'));
