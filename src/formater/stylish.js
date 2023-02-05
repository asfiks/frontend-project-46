const getIndent = (depth, correctSize = 0) => {
    const replacer = '  ';
    const spacesCount = 2;
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize - correctSize);
    const parantezIndent = replacer.repeat(indentSize - spacesCount);
    return [ indent, parantezIndent ];
  };
  
  const stringify = (value, depth) => {
    const [ indent, parantezIndent ] = getIndent(depth);
    if (typeof(value) !== 'object' || value === null ) return `${value}`;
    const entries = Object.entries(value)
    const resultArr = entries.map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);
    const result = [ '{', ...resultArr, `${parantezIndent}}` ]
    return result.join('\n');
};
  
const stylish = (diff, depth) => {
    const [ indent, parantezIndent ] = getIndent(depth, 1);
  
    const strResult = diff.map((node) => {
      const { key, type, value } = node;
      switch (type) {
        case 'nested':
          return `${indent}  ${key}: ${stylish(node.children, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `${indent}- ${key}: ${stringify(node.value1, depth + 1)}\n${indent}+ ${key}: ${stringify(node.value2, depth + 1)}`;
        default:
          return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
      }
    });
    
    const result = [ '{', ...strResult, `${parantezIndent}}` ];
    return result.join('\n');
};
  
  export default stylish;