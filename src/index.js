import parsersFile from './parsers.js';
import getDiffTree from './difftree.js';
import formatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const obj1 = parsersFile(filePath1);
  const obj2 = parsersFile(filePath2);
  const diffTree = getDiffTree(obj1, obj2);
  return formatter(diffTree, format);
};

export default genDiff;
