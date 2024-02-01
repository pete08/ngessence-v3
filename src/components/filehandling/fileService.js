const xss = require('xss');


export function checkFile (fileContent) {
    console.log(`checkFile;  BEFORE sanitize(fileContent), fileContent is: ${fileContent}`);
    const sanitizedFileContent = xss(fileContent);
    return sanitizedFileContent;

}