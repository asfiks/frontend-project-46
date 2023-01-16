#!/usr/bin/env node
import { program } from 'commander';
import * as _ from 'lodash';
import  { getObjectFromJson, getCompareObject } from './utils.js';

program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2) => {
            const file1 = getObjectFromJson(filepath1);
            const file2 = getObjectFromJson(filepath2);
            const result = getCompareObject(file1, file2);
                        
            console.log(resultSort);
            })
    .option('-f, --format <type>', 'output format')
    .parse();