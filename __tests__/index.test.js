import genDiff from '../src/index.js';
import path from 'path';
//import { dirname } from 'path';

//const getPath = (namefile) => path.join(path.resolve(), '__fixtures__', namefile);

test('genDiff null', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toEqual('There is no data in JSON');
});

test('genDiff', () => {
  expect(genDiff(getPath('file3.json'), getPath('file4.json'))).toEqual('- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true');
});
