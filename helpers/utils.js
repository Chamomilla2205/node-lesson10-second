const path = require('path');
const uuid = require('uuid').v1;

const _builder = (docName, itemType, itemId, dirName) => {
    const pathInStatic = path.join(dirName, `${itemId}`, `${itemType}`);
    const pathToStatic = path.join(process.cwd(), 'static', pathInStatic);
    const fileFormat = docName.split('.').pop();
    const baseName = `${uuid()}.${fileFormat}`;
    const mainPath = path.join(pathToStatic, baseName);
    const uploadPath = path.join(pathInStatic, baseName);
    return { uploadPath, mainPath, pathToStatic };
};
module.exports = {
    _builder
};
