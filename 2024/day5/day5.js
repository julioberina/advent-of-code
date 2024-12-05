import * as util from '../../utility.js';

const filePath = '/2024/day5/input.txt';
const data = await util.readFile(filePath);
const pagesAfter = {};
const invalidUpdates = [];

const addToPagesAfter = (line) => {
  const pair = line.split('|');

  if (!pagesAfter[pair[0]]) {
    pagesAfter[pair[0]] = new Set([pair[1]]);
  } else {
    pagesAfter[pair[0]].add(pair[1]);
  }
}

const isValidUpdate = (update) => {
  const visited = [];

  for (const current_page of update) {
    if (!pagesAfter[current_page]) {
      visited.push(current_page);
      continue;
    }

    const pagesAfterCurrentPage = pagesAfter[current_page];

    for (const prev_page of visited) {
      /*
        Ex. 94|57
        If one of the visited pages (57) is in the set of pages that comes after the current page (94),
        this means that 57 was printed before 94 when 94|57 indicates that 94 should print before 57.
        This violates the rule of 94|57 and therefore not making this a valid update
      */
      if (pagesAfterCurrentPage.has(prev_page)) { return false; }
    }

    visited.push(current_page);
  }

  return true;
}

const getInvalidUpdateIndicies = (update) => {
  const visited = [];
  let j = 0;

  for (const current_page of update) {
    if (!pagesAfter[current_page]) {
      visited.push(current_page);
      ++j;
      continue;
    }

    const pagesAfterCurrentPage = pagesAfter[current_page];
    let i = 0;

    for (const prev_page of visited) {
      // Explained in isValidUpdate function;
      if (pagesAfterCurrentPage.has(prev_page)) {
        return [i, j];
      }
      ++i;
    }

    visited.push(current_page);
    ++j;
  }
}

export const part1 = () => {
  let sumOfMiddles = 0;
  
  for (const line of data) {
    if (!line) { continue; }
    else if (line.match(/\|/g)) { 
      addToPagesAfter(line);
      continue;
    }

    const update = line.split(',');
    const mid = Math.floor(update.length / 2);
    const isValid = isValidUpdate(update);
    
    if (!isValid) { invalidUpdates.push(update); }

    sumOfMiddles += (isValid ? +update[mid] : 0);
  }

  return sumOfMiddles;
}

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export const part2 = () => {
  let sumOfMiddles = 0;
  let isValid = false;

  for (const invalidUpdate of invalidUpdates) {
    const mid = Math.floor(invalidUpdate.length / 2);

    while (!isValid) {
      const [i, j] = getInvalidUpdateIndicies(invalidUpdate);
      swap(invalidUpdate, i, j);
      isValid = isValidUpdate(invalidUpdate);
    }

    sumOfMiddles += (+invalidUpdate[mid]);
    isValid = false;
  }

  return sumOfMiddles;
}