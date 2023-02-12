import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import getParserFile from './parsers.js';
import getDiffTree from './difftree.js';
import formatter from './formatters/index.js';

const getAbsPath = (filePath) => path.resolve(cwd(), filePath);

const getExtention = (filePath) => path.extname(filePath);

const getDataFile = (filePath) => fs.readFileSync(getAbsPath(filePath), 'utf-8');

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = getDataFile(filePath1);
  const file2 = getDataFile(filePath2);
  const obj1 = getParserFile(file1, getExtention(filePath1));
  const obj2 = getParserFile(file2, getExtention(filePath2));
  const diffTree = getDiffTree(obj1, obj2);
  return formatter(diffTree, format);
};

export default genDiff;
