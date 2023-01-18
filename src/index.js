import _ from 'lodash';
import * as fs from 'node:fs';
import path from 'path';
import { cwd } from 'process';

const absPath = (filePath) => path.resolve(cwd(), filePath);

const isJson = (filePath) => {
  const arrPath = filePath.split('.');
  return arrPath[arrPath.length - 1] === 'json' ? true : false;
};

const getObjectFromJson = (filePath, encoding = "utf8") => {
  if (isJson(filePath)) return JSON.parse(fs.readFileSync(absPath(filePath)));
};
    
const getCompareObject = (obj1, obj2) => {
    const objKey1 =  Object.keys(obj1);
    const objKey2 =  Object.keys(obj2);
    const result = [];
    for (const key of objKey1) {
      if (objKey2.includes(key)) {
        if (obj1[key] === obj2[key]) {
        result.push({name: key, value: obj1[key], id: ' '});
        } else {
        result.push({name: key, value: obj1[key], id: '-'});
        result.push({name: key, value: obj2[key], id: '+'});
        }
       } else if (!objKey2.includes(key)) result.push({name: key, value: obj1[key], id: '-'});
    }
    for (const key of objKey2) {
      if (!objKey1.includes(key)) result.push({name: key, value: obj2[key], id: '+'});
    }
    return result;    
};

const sortDiff = (arr) => _.sortBy(arr, 'name');

const getStringFromArr = (arr) => {
  const result = arr.map((a) => `${a.id} ${a.name}: ${a.value}`);
  const stringResult = result.join('\n');
  return stringResult;
}

const genDiff = (filePath1, filePath2) => {
    const file1 = getObjectFromJson(filePath1);
    const file2 = getObjectFromJson(filePath2);
    const resulrArr =  getCompareObject(file1, file2);
    const sortArr = sortDiff(resulrArr);
    return getStringFromArr(sortArr);
};

export default genDiff;
