import * as util from '../../utility.js';

const filePath = '/2024/day8/input.txt';
const data = (await util.readFile(filePath))
  .map(line => line.split(''));
const rowCount = data.length;
const colCount = data[0].length;
const antennas = {};

const isSpotInBounds = (i, j) => {
  return (i >= 0 && i < rowCount && j >= 0 && j < colCount);
}

const isWithinOne = (i1, j1, i2, j2) => {
  return (Math.abs(j2 - j1) + Math.abs(i2 - i1)) <= 1;
}

export const part1 = () => {
  const uniqueAntinodeLocations = new Set();

  for (let i = 0; i < rowCount; ++i) {
    for (let j = 0; j < colCount; ++j) {
      if (data[i][j] === '.') { continue; }

      const char = data[i][j];
      if (!antennas[char]) { antennas[char] = [[i, j]]; }
      else { antennas[char].push([i, j]); }
    }
  }

  for (const antinode of Object.keys(antennas)) {
    const an = antennas[antinode].length;

    for (let i = 0; i < an; ++i) {
      const x = antennas[antinode][i];

      for (let j = 0; j < an; ++j) {
        if (i === j) { continue; }
        const y = antennas[antinode][j];

        if (isWithinOne(x[0], x[1], y[0], y[1])) { continue; }

        const [dx, dy] = [y[0] - x[0], y[1] - x[1]];

        if (isSpotInBounds(y[0] + dx, y[1] + dy)) {
          uniqueAntinodeLocations.add(`${y[0] + dx},${y[1] + dy}`);
        }
      }
    }
  }

  return uniqueAntinodeLocations.size;
}

export const part2 = () => {
  const uniqueAntinodeLocations = new Set();

  for (const antinode of Object.keys(antennas)) {
    const an = antennas[antinode].length;

    for (let i = 0; i < an; ++i) {
      const x = antennas[antinode][i];
      uniqueAntinodeLocations.add(`${x[0]},${x[1]}`);

      for (let j = 0; j < an; ++j) {
        if (i === j) { continue; }
        const y = antennas[antinode][j];
        uniqueAntinodeLocations.add(`${y[0]},${y[1]}`);

        const [dx, dy] = [y[0] - x[0], y[1] - x[1]];
        let spotX = y[0] + dx, spotY = y[1] + dy;

        while (isSpotInBounds(spotX, spotY)) {
          uniqueAntinodeLocations.add(`${spotX},${spotY}`);
          spotX += dx;
          spotY += dy;
        }
      }
    }
  }
  
  return uniqueAntinodeLocations.size;
}