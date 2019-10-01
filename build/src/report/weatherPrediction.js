"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const geometry_1 = require("../utils/geometry");
const weatherTypes_1 = __importDefault(require("../models/weatherTypes"));
const weatherReport_1 = __importDefault(require("../models/weatherReport"));
class WeatherPrediction {
    static predict(planets, sunX, sunY) {
        if (this.validateArguments(planets)) {
            let A, B, C;
            [A, B, C] = planets;
            const weatherReport = new weatherReport_1.default();
            // check if the planets are align in straigth line
            if (!geometry_1.heronFormula(A.x, A.y, B.x, B.y, C.x, C.y)) {
                //// if the three points form a straigth line, we check if the sun is align to.
                if (!geometry_1.heronFormula(A.x, A.y, B.x, B.y, sunX, sunY)) {
                    weatherReport.setWeatherType(weatherTypes_1.default.DROUGHT);
                }
                else {
                    weatherReport.setWeatherType(weatherTypes_1.default.OPTIMUM);
                }
            }
            /// calculate the perimeter and check if the sun is inside
            else if (geometry_1.checkSunInsideTriangle(A, B, C, sunX, sunY)) {
                let perimeter = geometry_1.calculateTrianglePerimeter(A, B, C, sunX, sunY);
                weatherReport.setWeatherTypeAndPerimeter(weatherTypes_1.default.RAINY, perimeter);
                weatherReport;
            }
            else {
                weatherReport.setWeatherType(weatherTypes_1.default.UNDEFINED);
            }
            return weatherReport;
        }
        throw new Error("the quantity and / or information of the planets is incorrect");
    }
    static validateArguments(planets) {
        if (planets !== null && planets.length === 3) {
            return true;
        }
        else
            return false;
    }
}
exports.default = WeatherPrediction;
