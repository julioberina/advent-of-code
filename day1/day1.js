import * as util from '../utility.js';

const filePath = '/day1/input.txt';
const data = (await util.readFile(filePath))
  .map(item => item.split(/\D+/))
  .map(arr => arr.map(item => +item));

export const part1 = async () => {
  const list1 = data.map(item => item[0]).sort((a, b) => a - b);
  const list2 = data.map(item => item[1]).sort((a, b) => a - b);

  let totalDistance = 0;

  for (let i = 0; i < list1.length; ++i) {
    totalDistance += Math.abs(list1[i] - list2[i]);
  }

  return totalDistance;
}

export const part2 = async () => {
  const tally = {};
  const list1 = data.map(item => item[0]);
  const list2 = data.map(item => item[1]);
  
  let similarityScore = 0;

  for (const num of list2) {
    tally[num] = (tally[num] || 0) + 1;
  }

  for (const num of list1) {
    similarityScore += (num * (tally[num] || 0));
  }

  return similarityScore;
}