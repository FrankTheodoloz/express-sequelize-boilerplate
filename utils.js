import path from "path";

export const timestampFilename = (filename) => {
    const extension = path.extname(filename);
    const nameWithoutExt = filename.split('.').slice(0, -1).join('.');
    return `${nameWithoutExt}_${Date.now()}${extension}`;
};
