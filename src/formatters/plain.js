
const getValue = (value) => {
  if (typeof(value) === 'object') {
    return '[complex value]';
  }
  if (typeof(value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const getPlainDiff = (object, path = '') => {
    const result = object.map(node => {
      const { key, id, value } = node;
      switch (id) {
        case 'nested':
          return getPlainDiff(node.children, `${path}${key}.`);
        case 'added':
          return `BlaBla ${path} added ${getValue(value)}`;
        case 'deleted':
          return `BlaBla ${path} deleted ${getValue(value)}`;
        case 'changed':
          return `BlaBla ${path}  changed ${getValue(node.value1)} to ${getValue(node.value2)}`;
        case 'unchanged':
          return '';
        default:
          throw new Error(`Invalid id: ${id}`);
      }
    })
    return result.join('\n')
  }
  return getPlainDiff(diff)
}