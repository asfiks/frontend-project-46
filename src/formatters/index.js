import stylish from './stylish.js';
import plain from './plain.js';
import toJson from './json.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff, 1);
    case 'plain':
      return plain(diff);
    case 'json':
      return toJson(diff);
    default:
      return 'Invalid format!';
  }
};
export default formatter;
