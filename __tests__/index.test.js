import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

describe('test genDiff with different formatters', () => {
  test.each([
    ['file1.json', 'file2.json', 'expectedStylish.txt', 'stylish'],
    ['file1.yml', 'file2.yml', 'expectedStylish.txt', 'stylish'],
    ['file1.json', 'file2.json', 'expectedPlain.txt', 'plain'],
    ['file1.yml', 'file2.yml', 'expectedPlain.txt', 'plain'],
    ['file1.yml', 'file2.yml', 'expectedJson.txt', 'json'],
    ['file1.json', 'file2.json', 'expectedJson.txt', 'json'],
  ])('genDiff compares files using different formatters and compares to expected result', (file1, file2, expectedResult, format) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(fs.readFileSync(getFixturePath(expectedResult), 'utf8'));
  });
});
