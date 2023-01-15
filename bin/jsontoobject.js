import * as fs from 'node:fs';

const getObjectFromJson = (filePath, encoding = "utf8") => {
    const obj = JSON.parse(fs.readFileSync(filePath));
    return obj;
};

export default getObjectFromJson;