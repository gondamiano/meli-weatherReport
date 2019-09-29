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
class weatherReportService {
    constructor() {
    }
    getWeather(day) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(weatherReport_1.default);
            const report = yield this.repository.findOne({
                select: ["_day", "weatherType"],
                where: {
                    _day: day
                }
            });
            if (report != null || report != undefined) {
                return report;
            }
            else {
                throw new Error("No report for that specific day");
            }
        });
    }
    save(report) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(weatherReport_1.default);
            this.repository.save(report)
                .then((result) => { return result; })
                .catch((err) => { throw err; });
        });
    }
}
exports.default = new weatherReportService();
