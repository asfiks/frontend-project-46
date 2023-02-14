import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './json.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return toJson(diff);
    default:
      throw new Error('Invalid format!');
  }
};
export default formatter;
