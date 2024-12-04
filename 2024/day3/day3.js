import * as util from '../../utility.js';

const filePath = '/2024/day3/input.txt';
const data = await util.readFile(filePath);
const mul_regex = /mul\(\d+\,\d+\)/g;
const mul_do_regex = /mul\(\d+\,\d+\)|do\(\)|don\'t\(\)/g

export const part1 = () => {
  let sumOfProducts = 0;

  for (const mulstring of data) {
    const mulgroup = mulstring.matchAll(mul_regex);

    for (const mul of mulgroup) {
      const instruction = mul.pop();

      sumOfProducts += [...instruction.matchAll(/\d+/g)]
        .map(item => +item)
        .reduce((a, b) => a * b);
    }
  }

  return sumOfProducts;
}

export const part2 = () => {
  let isMultEnabled = true;
  let sumOfProducts = 0;

  for (const mulstring of data) {
    const mulgroup = mulstring.matchAll(mul_do_regex);

    for (const mul of mulgroup) {
      const instruction = mul.pop();
      
      if (instruction[0] === 'd') {
        isMultEnabled = (instruction === 'do()');
        continue;
      } else if (!isMultEnabled) { continue; }

      sumOfProducts += [...instruction.matchAll(/\d+/g)]
        .map(item => +item)
        .reduce((a, b) => a * b);
    }
  }

  return sumOfProducts;
}