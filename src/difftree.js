import _ from 'lodash';

const getDiffTree = (obj1, obj2) => {
  const children1 = Object.keys(obj1);
  const children2 = Object.keys(obj2);
  const unionKeys = _.union(children1, children2);
  const sortedKeys = _.sortBy(unionKeys);

  const result = sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: getDiffTree(obj1[key], obj2[key]) };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }

    return { key, type: 'unchanged', value: obj2[key] };
  });

  return result;
};

export default getDiffTree;
