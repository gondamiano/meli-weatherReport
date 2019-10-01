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
const typeorm_1 = require("typeorm");
const report_1 = __importDefault(require("../models/report"));
class weatherReportService {
    constructor() {
    }
    save(report) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(report_1.default);
            this.repository.save(report).then(() => {
                console.log('saved correctly');
                return true;
            }).catch(err => {
                console.log('error');
                throw err;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository = typeorm_1.getConnection().getRepository(report_1.default);
            let reports = yield this.repository.find();
            if (reports != undefined) {
                return reports;
            }
            else {
                throw new Error;
            }
        });
    }
}
exports.default = new weatherReportService();
