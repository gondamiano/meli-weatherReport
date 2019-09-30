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
const planetDummy_1 = require("../dummy/planetDummy");
const weatherPrediction_1 = __importDefault(require("../report/weatherPrediction"));
const reportGenerator_1 = __importDefault(require("../report/reportGenerator"));
const weatherReportService_1 = __importDefault(require("../services/weatherReportService"));
class solarSystem {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.days_year = 360;
        this.actualDays = 1;
    }
    get days_per_year() {
        return this.days_year;
    }
    addPlanets(...planets) {
        this.planets = [...planets];
        console.log('====================================');
        console.log(planets[0]);
        console.log('====================================');
        debugger;
        console.log(this.planets);
    }
    startPrediction(years) {
        console.clear();
        this.addPlanets(planetDummy_1.getBetasoide(), planetDummy_1.getFerengi(), planetDummy_1.getVulcano());
        console.log(`Start prediction and the creating of the report for the next ${years} `);
        let totalDays = years * this.days_per_year;
        const reports = new Array();
        for (let i = 0; i < totalDays; i++) {
            const result = weatherPrediction_1.default.predict(this.planets, this.x, this.y);
            result.day = this.actualDays++;
            if (result.day == 815) {
                debugger;
            }
            //console.log(JSON.stringify(result) + ` ${this.planets[0].name} = (${this.planets[0].x},${this.planets[0].y})                  ${this.planets[1].name} = (${this.planets[1].x},${this.planets[1].y})                   ${this.planets[2].name} =        (${this.planets[2].x}, ${this.planets[2].y})  `);
            console.log(JSON.stringify(result) + ` A = ${this.planets[0].anglePosition}   ---- B = ${this.planets[1].anglePosition} ---------- C = ${this.planets[2].anglePosition}`);
            reports.push(result);
            reportGenerator_1.default.fill(result);
            this.planets.forEach(i => i.move());
        }
        this.saveReports(reports)
            .then(() => {
            return true;
        })
            .catch(err => {
            return false;
        });
        return true;
    }
    saveReports(result) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let maxPerimeter = Math.max.apply(Math, result.map((i) => {
                    return i.perimeter;
                }));
                let rainyDay = result.find(i => i.perimeter === maxPerimeter);
                (rainyDay !== undefined) ? rainyDay.maximumRain = true : false;
                let DBresponse = result.map((report) => __awaiter(this, void 0, void 0, function* () {
                    if (report.perimeter === maxPerimeter) {
                        report.setHeavyRain();
                    }
                    weatherReportService_1.default.save(report).catch((err) => {
                        console.log(err);
                        console.log('====================================');
                        console.log("FALLO");
                        console.log('====================================');
                    });
                }));
            }
            catch (err) {
                console.error("Error at saving reports" + err.toString());
                new Error("Error at saving reports");
            }
        });
    }
}
exports.default = new solarSystem();
