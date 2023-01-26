import _ from 'lodash';
import parsersFile  from './parsers.js';
import getDiffTree from './difftree.js'
import getAnswer from './answer.js'

const sortDiff = (arr) => _.sortBy(arr, 'name');

const getStringFromArr = (arr) => {
  const result = arr.map((a) => `${a.id} ${a.name}: ${a.value}`);
  const stringResult = result.join('\n');
  return stringResult;
};

const hasDateInObject = (obj) => (Object.keys(obj).length > 0);

const genDiff = (filePath1, filePath2) => {
  let result = '';
  const obj1 = parsersFile(filePath1);
  const obj2 = parsersFile(filePath2);
  if (_.isEqual(obj1, obj2) && !hasDateInObject(obj1)) result = 'There is no data in files';
  else {
    const resulrArr = getDiffTree(obj1, obj2);
    result = getAnswer(resulrArr);
  }
  return result;
};

export default genDiff;
