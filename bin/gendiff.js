#!/usr/bin/env node
import { program } from 'commander';
import  getObjectFromJson from './jsontoobject.js';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
            const file1 = getObjectFromJson(filepath1);
            const file2 = getObjectFromJson(filepath2);

            return console.log(file1, file2);
            })
    /*.action((filepath2) => {
            const readFile = fs.readFileSync(filepath1, "utf8");
            const obj = JSON.parse(readFile);
            return obj;
            })*/
    //.action((obj) => console.log(obj1))
    .option('-f, --format <type>', 'output format')
    .parse();