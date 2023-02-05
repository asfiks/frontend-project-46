import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const absPath = (filePath) => path.resolve(cwd(), filePath);

const parsersFile = (filePath) => {
    let parse;
    const nameFileArr = filePath.split('.');
    const extension = nameFileArr[nameFileArr.length - 1];
    if (extension === 'json') parse = JSON.parse(fs.readFileSync(absPath(filePath), 'utf-8'));
    else if (extension === 'yml' || extension === 'yaml') parse = yaml.load(fs.readFileSync(absPath(filePath)));
        if (parse === null || parse === undefined) parse = {};
    return parse;
};

export default parsersFile;
