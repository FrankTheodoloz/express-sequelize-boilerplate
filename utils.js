import path from "path";

module.exports.timestampFilename = (filename) => {
    const extension = path.extname(filename);
    const nameWithoutExt = filename.split('.').slice(0, -1).join('.');
    const newFileName = `${nameWithoutExt}_${Date.now()}${extension}`;
    return newFileName;
};
