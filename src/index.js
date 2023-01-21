import _ from 'lodash';
import parsersFile  from './parsers.js';

const getCompareObject = (obj1, obj2) => {
  const objKey1 = Object.keys(obj1);
  const objKey2 = Object.keys(obj2);
  const result = [];
  for (const key of objKey1) {
    if (objKey2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        result.push({ name: key, value: obj1[key], id: ' ' });
      } else {
        result.push({ name: key, value: obj1[key], id: '-' });
        result.push({ name: key, value: obj2[key], id: '+' });
      }
    } else if (!objKey2.includes(key)) result.push({ name: key, value: obj1[key], id: '-' });
  }
  for (const key of objKey2) {
    if (!objKey1.includes(key)) result.push({ name: key, value: obj2[key], id: '+' });
  }
  return result;
};

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
  if (obj1 === null && obj2 === null || obj2 === 'underfind') result = 'There is no data in files';
  else if (obj1 === 'underfind' && obj2 === 'underfind' || obj2 === null) result = 'There is no data in files';
  else if (_.isEqual(obj1, obj2) && !hasDateInObject(obj1)) result = 'There is no data in files';
  else {
    const resulrArr = getCompareObject(obj1, obj2);
    const sortArr = sortDiff(resulrArr);
    result = getStringFromArr(sortArr);
  }
  return result;
};

export default genDiff;
