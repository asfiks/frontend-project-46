import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('diff two json files with stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf8'));
});

test('diff two yml files with stylish', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf8'));
});

test('diff two yml files with plain', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf8'));
});

test('diff two json files with plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf8'));
});

test('diff two json files with json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'))
    .toEqual(fs.readFileSync(getFixturePath('expectedJson.txt'), 'utf8'));
});

test('diff two yml files with json', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json'))
    .toEqual(fs.readFileSync(getFixturePath('expectedJson.txt'), 'utf8'));
});
