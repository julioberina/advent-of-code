import * as util from '../../utility.js';

const filePath = '/2024/day2/input.txt';
const data = (await util.readFile(filePath))
  .map(item => item.split(/\D+/))
  .map(arr => arr.map(item => +item));

const unsafeIndicies = new Set();

/*
  Safe value will be:
  0 - Unsafe
  1 - Safe
*/
const safeValue = (level) => {
  let delta;

  for (let i = 1; i < level.length; ++i) {
    const diff = level[i] - level[i-1];

    if (Math.abs(diff) > 3 || diff === 0) { return 0; }
    else if (delta && Math.sign(delta) !== Math.sign(diff)) { return 0; }

    delta = diff;
  }

  return 1;
}

export const part1 = () => {
  let totalSafe = 0;

  data.forEach((level, i) => {
    const safeVal = safeValue(level);
    if (!safeVal) { unsafeIndicies.add(i); }
    totalSafe += safeVal;
  });

  return totalSafe;
}

export const part2 = () => {
  let totalSafe = data.length - unsafeIndicies.size; // Total - # of unsafe = # of safe indicies

  for (const idx of unsafeIndicies) {
    const level = data[idx];

    for (let i = 0; i < level.length; ++i) {
      const levelRemoveOne = level.filter((_, j) => i !== j);
      const safeVal = safeValue(levelRemoveOne);

      if (safeVal) {
        totalSafe += safeVal;
        break;
      }
    }
  }

  return totalSafe;
}