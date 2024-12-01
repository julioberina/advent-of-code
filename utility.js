import fs from 'node:fs/promises';

export const readFile = async (filePath) => {
  const fullFilePath = process.cwd() + filePath;
  const data = await fs.readFile(fullFilePath, { encoding: 'utf8' });
  return data.split('\n');
}