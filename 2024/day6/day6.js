import * as util from '../../utility.js';

const filePath = '/2024/day6/input.txt';
const data = (await util.readFile(filePath))
  .map(row => row.split(''));
const rowCount = data.length;
const colCount = data[0].length;

/*
  Dir (direction) values:
  0 - up,
  90 - right,
  180 - down,
  270 - left
*/
const lookaheadItem = (i, j, dir) => {
  if (dir === 0 && i-1 >= 0) {
    return data[i-1][j];
  } else if (dir === 90 && j+1 < colCount) {
    return data[i][j+1];
  } else if (dir === 180 && i+1 < rowCount) {
    return data[i+1][j];
  } else if (dir === 270 && j-1 >= 0) {
    return data[i][j-1];
  }

  return null; // null is out of bounds
}

const moveGuardAndReturnNewPos = (i, j, dir) => {
  const guard = data[i][j];
  data[i][j] = 'X';

  if (dir === 0) {
    data[i-1][j] = guard;
    return [i-1, j];
  } else if (dir === 90) {
    data[i][j+1] = guard;
    return [i, j+1];
  } else if (dir === 180) {
    data[i+1][j] = guard;
    return [i+1, j];
  } else if (dir === 270) {
    data[i][j-1] = guard;
    return [i, j-1];
  }

  return null;
}

const rotateGuard90Degrees = (i, j, dir) => {
  if (dir === 0) {
    data[i][j] = '>';
  } else if (dir === 90) {
    data[i][j] = 'v';
  } else if (dir === 180) {
    data[i][j] = '<';
  } else if (dir === 270) {
    data[i][j] = '^';
  }

  return (dir + 90) % 360;
}

const getGuardDir = (i, j) => {
  const guard = data[i][j];

  if (guard === '^') {
    return 0;
  } else if (guard === '>') {
    return 90;
  } else if (guard === 'v') {
    return 180;
  } else if (guard === '<') {
    return 270;
  }

  return null;
}

const getDistinctSpots = (i, j) => {
  const visited = new Set([`${i},${j}`]);
  let r = i, c = j;
  let dir = getGuardDir(r, c);

  while (lookaheadItem(r, c, dir)) {
    const lookItem = lookaheadItem(r, c, dir);

    if (lookItem === '#') { dir = rotateGuard90Degrees(r, c, dir); }
    else {
      [r, c] = moveGuardAndReturnNewPos(r, c, dir);
      visited.add(`${r},${c}`);
    }
  }

  return visited.size;
}

export const part1 = () => {
  for (let i = 0; i < rowCount; ++i) {
    for (let j = 0; j < colCount; ++j) {
      const item = data[i][j];
      if (item !== '.' && item !== '#') { return getDistinctSpots(i, j); }
    }
  }
}

export const part2 = () => {
  return 'Part 2';
}