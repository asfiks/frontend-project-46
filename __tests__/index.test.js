import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('diff two json with stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
      .toEqual(fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf8'));
});

/*test('genDiff json files no data', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual('There is no data in files');
});


test('genDiff yml files no data', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'))).toEqual('There is no data in files');
});
*/