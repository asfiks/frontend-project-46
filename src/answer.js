
const getAnswer = (data) => {
    let result = '';
    for (const obj of data) {
      switch (obj['id']) {
        case 'deleted':
          result += `- ${obj['key']}: ${obj['value']}\n`;
          break;
        case 'unchanged':
          result += `  ${obj['key']}: ${obj['value']}\n`;
          break;
        case 'changed':
          result += `- ${obj['key']}: ${obj['value1']}\n`;
          result += `+ ${obj['key']}: ${obj['value2']}\n`;
          break;
        case 'added':
          result += `+ ${obj['key']}: ${obj['value']}\n`;
          break;
        case 'nested':
          result += getAnswer(obj['children']);
          break;
        default:
          result = 'this is error';
      }
    }
    return result;
  }

  export default getAnswer;