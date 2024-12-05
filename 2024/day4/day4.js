import * as util from '../../utility.js';

const filePath = '/2024/day4/input.txt';
const data = await util.readFile(filePath);
const rowCount = data.length;
const colCount = data[0].length;

const getXmasCount = (row, col) => {
  let xmasCount = 0;

  const isWithinUpperBound = (row - 3) >= 0;
  const isWithinLowerBound = (row + 3) < rowCount;
  const isWithinLeftBound = (col - 3) >= 0;
  const isWithinRightBound = (col + 3) < colCount;

  if (isWithinUpperBound) {
    const top = [0, 1, 2, 3].map(n => data[row-n][col]).join('');
    xmasCount += (top === 'XMAS' ? 1 : 0);

    if (isWithinRightBound) {
      const top_right = [0, 1, 2, 3].map(n => data[row-n][col+n]).join('');
      xmasCount += (top_right === 'XMAS' ? 1 : 0);
    }

    if (isWithinLeftBound) {
      const top_left = [0, 1, 2, 3].map(n => data[row-n][col-n]).join('');
      xmasCount += (top_left === 'XMAS' ? 1 : 0);
    }
  }

  if (isWithinRightBound) {
    const right = [0, 1, 2, 3].map(n => data[row][col+n]).join('');
    xmasCount += (right === 'XMAS' ? 1 : 0);
  }

  if (isWithinLeftBound) {
    const left = [0, 1, 2, 3].map(n => data[row][col-n]).join('');
    xmasCount += (left === 'XMAS' ? 1 : 0);
  }

  if (isWithinLowerBound) {
    const bottom = [0, 1, 2, 3].map(n => data[row+n][col]).join('');
    xmasCount += (bottom === 'XMAS' ? 1 : 0);

    if (isWithinRightBound) {
      const bottom_right = [0, 1, 2, 3].map(n => data[row+n][col+n]).join('');
      xmasCount += (bottom_right === 'XMAS' ? 1 : 0);
    }

    if (isWithinLeftBound) {
      const bottom_left = [0, 1, 2, 3].map(n => data[row+n][col-n]).join('');
      xmasCount += (bottom_left === 'XMAS' ? 1 : 0);
    }
  }

  return xmasCount;
}

const hasMasX = (row, col) => {
  const isWithinUpperBound = (row - 1) >= 0;
  const isWithinLowerBound = (row + 1) < rowCount;
  const isWithinLeftBound = (col - 1) >= 0;
  const isWithinRightBound = (col + 1) < colCount;
  const isWithinWholeGrid = isWithinUpperBound && isWithinLowerBound && isWithinLeftBound && isWithinRightBound;

  if (!isWithinWholeGrid) { return false; }

  const top_left = data[row-1][col-1];
  const bottom_left = data[row+1][col-1];
  const top_right = data[row-1][col+1];
  const bottom_right = data[row+1][col+1];

  // We're looking for an X-shaped MAS. X is an invalid character in this case
  // So is A which should only be the middle character and not the sides
  if ([top_left, top_right, bottom_left, bottom_right].includes('X')
      || [top_left, top_right, bottom_left, bottom_right].includes('A')) { return false; }

  /*
    Example of vertical match:
    M.S
    .A.
    M.S

    Example of horizontal match:
    M.M
    .A.
    S.S
  */

  const isVerticalLeftMatch = (top_left === bottom_left);
  const isVerticalRightMatch = (top_right === bottom_right);

  if (isVerticalLeftMatch && isVerticalRightMatch && (top_left !== top_right)) { return true; }

  const isHorizontalTopMatch = (top_left === top_right);
  const isHorizontalBottomMatch = (bottom_left === bottom_right);

  if (isHorizontalTopMatch && isHorizontalBottomMatch && (top_left !== bottom_left)) { return true; }

  return false;
}

export const part1 = () => {
  let xmasCount = 0;

  for (let i = 0; i < rowCount; ++i) {
    for (let j = 0; j < colCount; ++j) {
      if (data[i][j] === 'X') {
        xmasCount += getXmasCount(i, j);
      }
    }
  }

  return xmasCount;
}

export const part2 = () => {
  let masXCount = 0;

  for (let i = 0; i < rowCount; ++i) {
    for (let j = 0; j < colCount; ++j) {
      if (data[i][j] === 'A') {
        masXCount += (hasMasX(i, j) ? 1 : 0);
      }
    }
  }

  return masXCount;
}