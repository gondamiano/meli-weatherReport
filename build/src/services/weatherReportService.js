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
const weatherReport_1 = __importDefault(require("../models/weatherReport"));
const typeorm_1 = require("typeorm");
const weatherTypes_1 = __importDefault(require("../models/weatherTypes"));
//// weather service
class weatherReportService {
    constructor() {
    }
    //// SELECT del clima para el dia especifico
    getWeather(_day) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(weatherReport_1.default);
            const report = yield this.repository.findOne({
                select: ["day", "weatherType"],
                where: {
                    day: _day
                }
            });
            console.log(report);
            if (report != null && report != undefined) {
                return report;
            }
            else {
                throw new Error("No report for that specific day");
            }
        });
    }
    //// insert or update de un reporte
    save(report) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(weatherReport_1.default);
            this.repository.save(report)
                .then((result) => { return result; })
                .catch((err) => { throw err; });
        });
    }
    //// insert or update de todos los reportes a la vez.
    saveAll(reports) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("estamos aca : " + reports.length);
            this.repository = typeorm_1.getConnection().getRepository(weatherReport_1.default);
            this.repository.save(reports)
                .then((result) => { return result; })
                .catch((err) => { throw err; });
        });
    }
    //// select de la ultima fecha de ejecucion del show
    getLastUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(weatherReport_1.default);
            let date = yield this.repository.findOne({
                select: ["updated_date"],
                order: {
                    "day": "DESC",
                }
            });
            return date;
        });
    }
    //// select de los dias con lluvia intensa
    getHeavyRainyDays() {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(weatherReport_1.default);
            let date = yield this.repository.find({
                select: ["day"],
                where: {
                    weatherType: weatherTypes_1.default.HEAVYRAIN,
                }
            });
            return date.map(i => (i.day));
        });
    }
}
exports.default = new weatherReportService();
