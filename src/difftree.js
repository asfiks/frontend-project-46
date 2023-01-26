import _ from 'lodash';


const getChildren = (object1, object2) => {
    const children1 = Object.keys(object1);
    const children2 = Object.keys(object2);
    const result = _.union(children1, children2);
    return _.sortBy(result);
}

const getDiffTree = (obj1, obj2) => {
    const keys = getChildren(obj1, obj2);
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

export default getDiffTree;