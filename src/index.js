import _ from 'lodash';
import parsersFile from './parsers.js';
import getDiffTree from './difftree.js';
import stylish from './formatters/stylish.js';

const sortDiff = (arr) => _.sortBy(arr, 'name');

const hasDateInObject = (obj) => (Object.keys(obj).length > 0);

const genDiff = (filePath1, filePath2) => {
  const obj1 = parsersFile(filePath1);
  const obj2 = parsersFile(filePath2);
  if (_.isEqual(obj1, obj2) && !hasDateInObject(obj1)) result = 'There is no data in files';
  const resulrArr = getDiffTree(obj1, obj2);

  return stylish(resulrArr, 1);
};

export default genDiff;
