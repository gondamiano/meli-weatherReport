"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const report_1 = __importDefault(require("../models/report"));
const weatherTypes_1 = __importDefault(require("../models/weatherTypes"));
const reportService_1 = __importDefault(require("../services/reportService"));
/// Genera los reportes finales de periodos y los guarda en la base
class reportGenerator {
    constructor() {
        this.reports = new Array;
    }
    show() {
        console.log("info", "Report created succesfully.");
        console.log(JSON.stringify(this.reports));
    }
    createFinalReport(data) {
        let types = Object.values(weatherTypes_1.default);
        for (let values of types) {
            let report = new report_1.default();
            let count = data.filter(i => i.weatherType === values).length;
            report.fill(values, count);
            this.reports.push(report);
        }
        ;
        reportService_1.default.save(this.reports).catch(err => (err));
    }
}
exports.default = new reportGenerator;
