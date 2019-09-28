"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
class reportGenerator {
    constructor() {
        this.periodAmount = {};
    }
    create(data) {
        data.forEach(report => {
            if (this.periodAmount[report.weatherType]) {
                this.periodAmount[report.weatherType] += 1;
            }
            else {
                this.periodAmount[report.weatherType] = 1;
            }
        });
        this.show();
    }
    show() {
        logger_1.default.log("info", "Report created succesfully.");
        logger_1.default.log(JSON.stringify(this.periodAmount));
    }
    fill(data) {
        if (this.periodAmount[data.weatherType]) {
            this.periodAmount[data.weatherType] += 1;
        }
        else {
            this.periodAmount[data.weatherType] = 1;
        }
    }
}
exports.default = new reportGenerator;
