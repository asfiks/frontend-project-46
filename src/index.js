import _ from 'lodash';
import * as fs from 'node:fs';
import path from 'path';
//import {cwd} from 'process';

//const pathFile1 = path.resolve(cwd())
//const pathFile2 = path.resolve(cwd(filepath2))

const absPath = (filePath) => path.resolve(filePath);

const getObjectFromJson = (filePath, encoding = "utf8") => {
    const obj = JSON.parse(fs.readFileSync(absPath(filePath)));
    return obj;
};

const getCompareObject = (obj1, obj2) => {
    const objKey1 =  Object.keys(obj1);
    const objKey2 =  Object.keys(obj2);
    const result = [];
    for (const key of objKey1) {
      const obj = {}
      if (objKey2.includes(key)) {
        if (obj1[key] === obj2[key]) {
        result.push({key: key, value: obj1[key]});
        } else {
        result.push({key: `- ${key}`, value: obj1[key]});
        result.push({key: `+ ${key}`, value: obj2[key]});
        }
       } else if (!objKey2.includes(key)) result.push({key: `- ${key}`, value: obj1[key]});
    }
    for (const key of objKey2) {
      if (!objKey1.includes(key)) result.push({key: `+ ${key}`, value: obj2[key]});
    }
    return result;    
};

const genDiff = (filePath1, filePath2) => {
    const file1 = getObjectFromJson(filePath1);
    const file2 = getObjectFromJson(filePath2);
    return getCompareObject(file1, file2);
};

export default genDiff;
