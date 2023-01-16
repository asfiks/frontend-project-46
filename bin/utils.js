import * as fs from 'node:fs';
import * as _ from 'lodash';
//import * as path from 'path';

//export const absPath = (filePath) => path.resolve('../', '/bin', filePath);

export const getObjectFromJson = (filePath, encoding = "utf8") => {
    const obj = JSON.parse(fs.readFileSync(filePath));
    return obj;
};

export const getCompareObject = (obj1, obj2) => {
    const objKey1 =  Object.keys(obj1);
    const objKey2 =  Object.keys(obj2);
    const result = {};
    for (const key of objKey1) {
    if (objKey2.includes(key)) {
        if (obj1[key] === obj2[key]) {
        result[key] = obj1[key];
        } else {
        result[`- ${key}`] = obj1[key];
        result[`+ ${key}`] = obj2[key];
        }
    } else if (!objKey2.includes(key)) result[`- ${key}`] = obj1[key];
    }
    for (const key of objKey2) {
        if (!objKey1.includes(key)) result[`+ ${key}`] = obj2[key];
    }
    return result;    
}

export const getStringFromObject = (obj) => {
    let result = '';
    const objKey =  Object.keys(obj);
    for (const key of objKey) {
        result += `${key}: ${obj[key]}\n`;
    }
    return result;
}