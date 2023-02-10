import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';

const absPath = (filePath) => path.resolve(cwd(), filePath);

const parsersFile = (filePath) => {
  const nameFileArr = filePath.split('.');
  const extension = nameFileArr[nameFileArr.length - 1];
  switch (extension) {
    case 'json':
      return JSON.parse(fs.readFileSync(absPath(filePath), 'utf-8'));
    case 'yml' || 'yaml':
      return yaml.load(fs.readFileSync(absPath(filePath)));
    default:
      throw new Error('Invalid extension');
  }
};

export default parsersFile;
