"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const solarSystem_1 = __importDefault(require("../models/solarSystem"));
const weatherReportService_1 = __importDefault(require("../services/weatherReportService"));
class predictionJob {
    calculate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let report = yield weatherReportService_1.default.getLastUpdate();
            if (report != undefined && predictionJob.isTheRightTime(report)) {
                let result = solarSystem_1.default.startPrediction(10);
                if (result) {
                    console.log("Prediction successful. Database updated.");
                    res.sendStatus(200);
                }
                else {
                    console.log("Prediction failed. try again next year, haha.");
                    res.sendStatus(400);
                }
            }
            else {
                console.log("is not the right time");
                res.sendStatus(404);
            }
        });
    }
    static isTheRightTime(report) {
        let date = report.updated_date;
        let actualDate = new Date;
        date.setFullYear(date.getFullYear() + 10);
        if (date < actualDate) {
            return true;
        }
        else {
            return false;
        }
    }
}
;
exports.default = new predictionJob;
