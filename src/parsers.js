import yaml from 'js-yaml';

const getParserFile = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('Invalid extension');
  }
};

export default getParserFile;
