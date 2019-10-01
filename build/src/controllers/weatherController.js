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
class weatherController {
    constructor() {
        this.weatherService = weatherReportService_1.default;
    }
    getWeatherByDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query && req.query.dia) {
                let day = req.query.dia;
                day = parseInt(day);
                if (day > 0) {
                    try {
                        const report = yield weatherReportService_1.default.getWeather(day);
                        const response = exports.WeatherController.generateReportForResponse(report);
                        res.send(JSON.stringify(response));
                    }
                    catch (err) {
                        console.log(err);
                        res.send(err);
                    }
                }
                return res.sendStatus(400);
            }
            else {
                return new Error("missing query");
            }
        });
    }
    saveReports(reports) {
        reports.forEach(report => {
            let info = this.weatherService.save(report);
        });
        console.log("All reports were saved.");
    }
    save(report) {
        this.weatherService.save(report);
    }
    generateReportForResponse(report) {
        if (report.day != undefined && report.weatherType != undefined)
            return { dia: report.day, clima: report.weatherType };
        else
            throw Error;
    }
}
exports.WeatherController = new weatherController();
