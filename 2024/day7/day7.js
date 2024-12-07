import * as util from '../../utility.js';

const filePath = '/2024/day7/input.txt';
const data = await util.readFile(filePath);
const fn = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '||': (a, b) => +`${a}${b}`
};
const nonTrueLineNums = [];
const part1Answer = [];

const getOperatorsList = (opCount, hasConcat) => {
  const operatorsList = [[]];
  let power = 1;

  /*
    opCount should be one less than the amount of numbers in the equation
    ex. 23 4 8 12 has four numbers and therefore should have 3 operators
    and operatorsList would have lists of 3 operators
  */
  for (let i = 0; i < opCount; ++i) {

    /*
      Amount of lists in the operatorsList should progress by powers of 2 (3 with concat operator)
      Ex.
      1 opCount = 2^1 lists of 1 operator (3^1 lists of 1 operator with concat operator)
      2 opCount = 2^2 lists of 2 operators (3^2 lists of 2 operators with concat operator)
      3 opCount = 2^3 lists of 3 operators (3^3 lists of 3 operators with concat operator)
      .
      .
      .
      n opCount = 2^n lists of n operators (3^n lists of n operators with concat operator)
    */
    for (let p = 0; p < power; ++p) {
      const opListItem = operatorsList.shift();
      const adder = opListItem.slice();
      const multiplier = opListItem.slice();

      adder.push('+');
      multiplier.push('*');

      operatorsList.push(adder, multiplier);

      if (hasConcat) {
        const concatenator = opListItem.slice();
        concatenator.push('||');
        operatorsList.push(concatenator);
      }
    }

    power *= (hasConcat ? 3 : 2);
  }

  return operatorsList;
}

const getCalibration = (nums, operators) => {
  for (const operator of operators) {
    const sum = fn[operator](nums[0], nums[1]);
    for (let i = 0; i < 2; ++i) { nums.shift(); }
    nums.unshift(sum);
  }

  return nums.shift();
}

export const part1 = () => {
  let totalCalibration = 0;

  for (const line of data) {
    const nums = line.match(/\d+/g).map(num => +num);
    const expectedCalibration = nums.shift();
    let hasTrueEquation = false;

    // Number of spaces in between the numbers is the length of the operators list
    const operatorsList = getOperatorsList(nums.length - 1, false);

    for (const operators of operatorsList) {
      const actualCalibration = getCalibration(nums.slice(), operators);

      if (actualCalibration === expectedCalibration) {
        totalCalibration += expectedCalibration;
        hasTrueEquation = true;
        break;
      }
    }

    if (!hasTrueEquation) {
      nums.unshift(expectedCalibration);
      nonTrueLineNums.push(nums);
    }
  }

  part1Answer.push(totalCalibration); // Save Part1 answer for Part 2 optimization purposes
  return totalCalibration;
}

export const part2 = () => {
  let totalCalibration = 0;

  for (const nums of nonTrueLineNums) {
    const expectedCalibration = nums.shift();

    // Number of spaces in between the numbers is the length of the operators list
    const operatorsList = getOperatorsList(nums.length - 1, true);

    for (const operators of operatorsList) {
      const actualCalibration = getCalibration(nums.slice(), operators);

      if (actualCalibration === expectedCalibration) {
        totalCalibration += expectedCalibration;
        break;
      }
    }
  }

  return totalCalibration + part1Answer.pop();
}