import _ from 'lodash';
import pkg from 'lodash';
const { sortedUniq } = pkg;

const file1 = {
    "common": {
      "setting1": "Value 1",
      "setting2": 200,
      "setting3": true,
      "setting6": {
        "key": "value",
        "doge": {
          "wow": ""
        }
      }
    },
    "group1": {
      "baz": "bas",
      "foo": "bar",
      "nest": {
        "key": "value"
      }
    },
    "group2": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  }
 const file2 = {
    "common": {
      "follow": false,
      "setting1": "Value 1",
      "setting3": null,
      "setting4": "blah blah",
      "setting5": {
        "key5": "value5"
      },
      "setting6": {
        "key": "value",
        "ops": "vops",
        "doge": {
          "wow": "so much"
        }
      }
    },
    "group1": {
      "foo": "bar",
      "baz": "bars",
      "nest": "str"
    },
    "group3": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }

const getChildren = (object1, object2) => {
    const children = [Object.keys(object1), Object.keys(object2)];
    const result = children.flatMap(element => element);
    _.sortBy(result);
    return _.sortedUniq(result);
}
console.log(getChildren(file1, file2))
const getDiffTree = (obj1, obj2) => {
    const keys = getChildren(file1, file2);
    
    const result = keys.map(key => {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
            return { key, id: 'nested', children:  getDiffTree(obj1[key], obj2[key]) }
        }
        else if (!Object.hasOwn(obj1, key)) {
            return { key, id: 'added', value: obj2[key] }
        }
        else if (!Object.hasOwn(obj2, key)) {
            return { key, id: 'deleted', value: obj1[key] }
        }
        else if (!Object.hasOwn(obj1, key)) {
            return { key, id: 'deleted', value: obj1[key] }
        }
        else if (obj1[key] === obj2[key]) {
            return { key, id: 'unchanged', value: obj1[key] }
        }
        else if (obj1[key] !== obj2[key]) {
            return { key, id: 'changed', value1: obj1[key], value2: obj2[key] }
        }            

    })
    return result;
}
//console.log(getDiffTree(file1, file2));