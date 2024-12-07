import * as util from '../../utility.js';

const filePath = '/2024/day6/input.txt';
const data = (await util.readFile(filePath))
  .map(row => row.split(''));
const rowCount = data.length;
const colCount = data[0].length;
const emptySpotsGuardFirst = [];

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

  if (dir === 0) {
    return [i-1, j];
  } else if (dir === 90) {
    return [i, j+1];
  } else if (dir === 180) {
    return [i+1, j];
  } else if (dir === 270) {
    return [i, j-1];
  }

  return null;
}

const rotateGuard90Degrees = (i, j, dir) => {
  return (dir + 90) % 360;
}

const getDistinctSpots = (i, j) => {
  const visited = new Set([`${i},${j}`]);
  let r = i, c = j;
  let dir = 0;

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

const getLoopsCount = (i, j) => {
  const walls = new Set();
  let r = i, c = j;
  let dir = 0;

  while (lookaheadItem(r, c, dir)) {
    const lookItem = lookaheadItem(r, c, dir);

    if (lookItem === '#') {
      const spotAndDir = `${r},${c},${dir}`;
      
      if (walls.has(spotAndDir)) { return 1; }
      
      walls.add(spotAndDir);
      dir = rotateGuard90Degrees(r, c, dir);
    }
    else { [r, c] = moveGuardAndReturnNewPos(r, c, dir); }
  }

  return 0;
}

export const part1 = () => {
  let distinctSpots = 0;

  for (let i = 0; i < rowCount; ++i) {
    for (let j = 0; j < colCount; ++j) {
      const item = data[i][j];

      if (item === '.') { emptySpotsGuardFirst.push([i, j]); }
      else if (item !== '#') {
        emptySpotsGuardFirst.unshift([i, j]); // Empty spots first with guard spot (i, j) as the first item
        distinctSpots = getDistinctSpots(i, j);
      }
    }
  }

  return distinctSpots;
}

export const part2 = () => {
  let loopsAfterAddedWall = 0;
  const [gi, gj] = emptySpotsGuardFirst.shift();

  for (const emptySpot of emptySpotsGuardFirst) {
    const [i, j] = emptySpot;
    data[i][j] = '#';
    loopsAfterAddedWall += getLoopsCount(gi, gj);
    data[i][j] = '.';
  }

  return loopsAfterAddedWall;
}