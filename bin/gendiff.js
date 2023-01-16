#!/usr/bin/env node
import { program } from 'commander';
import * as _ from 'lodash';
import  { getObjectFromJson, getCompareObject, getStringFromObject } from './utils.js';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    //.action((filepath1) => console.log(absPath(filepath1)))

    .action((filepath1, filepath2) => {
            const file1 = getObjectFromJson(filepath1);
            const file2 = getObjectFromJson(filepath2);
            const compare = getCompareObject(file1, file2);
            const result = getStringFromObject(compare);            
            console.log(result);
            })

    .option('-f, --format <type>', 'output format')
    .parse();