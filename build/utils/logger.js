"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const console_1 = require("console");
const output = fs_1.default.createWriteStream('../../logger.log');
const errOutput = fs_1.default.createWriteStream('../../error.log');
const Logger = new console_1.Console({ stdout: output, stderr: errOutput });
/*
Logger.log = function (message : string) {
    console.log(`${Date().toString()}:   ${message}`);
}*/
exports.default = Logger;
