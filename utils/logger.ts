import fs from 'fs';
import { Console } from 'console';

const output = fs.createWriteStream('../../logger.log');
const errOutput = fs.createWriteStream('../../error.log');

const Logger : Console = new Console({stdout: output, stderr: errOutput})
/*
Logger.log = function (message : string) {
    console.log(`${Date().toString()}:   ${message}`);
}*/
export default Logger;