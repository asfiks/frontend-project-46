import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);



test('genDiff json files no data', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual('There is no data in files');
});

test('genDiff json files', () => {
  expect(genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'))).toEqual('- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true');
});

test('genDiff if one of file json no data', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file4.json'))).toEqual('+ host: hexlet.io\n+ timeout: 20\n+ verbose: true');
});

test('genDiff yml files no data', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'))).toEqual('There is no data in files');
});

test('genDiff', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual('- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true');
});
