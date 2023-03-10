const getValue = (value) => {
  if (typeof (value) === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const getPlainDiff = (object, path = '') => {
    const result = object
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const { key, type, value } = node;
        const pathKey = path + key;
        switch (type) {
          case 'nested':
            return getPlainDiff(node.children, `${pathKey}.`);
          case 'added':
            return `Property '${pathKey}' was added with value: ${getValue(value)}`;
          case 'deleted':
            return `Property '${pathKey}' was removed`;
          case 'changed':
            return `Property '${pathKey}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;
          default:
            throw new Error(`Invaltype type: ${type}`);
        }
      });

    return result.join('\n');
  };
  return getPlainDiff(diff);
};
export default plain;
