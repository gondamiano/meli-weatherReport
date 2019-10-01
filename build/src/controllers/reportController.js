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
const weatherReportService_1 = __importDefault(require("../services/weatherReportService"));
const reportService_1 = __importDefault(require("../services/reportService"));
class reportController {
    constructor() {
        this.reportService = reportService_1.default;
    }
    getFinalReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let reports = yield reportService_1.default.getAll();
            let heavyRainyDay = yield weatherReportService_1.default.getHeavyRainyDays();
            if (reports != undefined && heavyRainyDay != undefined) {
                let reportPresentation = exports.ReportController.formatResponse(reports, heavyRainyDay);
                console.log(reportPresentation);
                res.send("<div>" + reportPresentation + "</div>");
            }
            else {
                res.sendStatus(404);
            }
        });
    }
    formatResponse(reports, rainyDays) {
        let reportPresentation = reports.map(report => (` ${report._periodAmount}  periodos de ${report.weatherType} <br> `));
        reportPresentation.push("<br> dias en los que llovera intensamente: <br>");
        let presentation = reportPresentation.join().replace(/,/g, " ");
        let rainDayString = rainyDays.toString();
        presentation += rainDayString;
        return presentation;
    }
}
exports.ReportController = new reportController();
