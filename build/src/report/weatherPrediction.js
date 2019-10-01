"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const geometry_1 = require("../utils/geometry");
const weatherTypes_1 = __importDefault(require("../models/weatherTypes"));
const weatherReport_1 = __importDefault(require("../models/weatherReport"));
//// Predice el clima utilizando functiones de calculos de la carpeta /utils
class WeatherPrediction {
    static predict(planets, sunX, sunY) {
        if (this.validateArguments(planets)) {
            let A, B, C;
            [A, B, C] = planets;
            const weatherReport = new weatherReport_1.default();
            // chequeamos si los planetas estan alineados con la formula Heron
            if (!geometry_1.heronFormula(A.x, A.y, B.x, B.y, C.x, C.y)) {
                //// si los tres planetas estan alineados, chequeamos si el sol tambien
                //// se encuentra alineado a los planetas.
                if (!geometry_1.heronFormula(A.x, A.y, B.x, B.y, sunX, sunY)) {
                    weatherReport.setWeatherType(weatherTypes_1.default.DROUGHT);
                }
                else {
                    weatherReport.setWeatherType(weatherTypes_1.default.OPTIMUM);
                }
            }
            /// Si los planetas no estan alineados, chequeamos si el perimetro formado
            /// por los planetas contienen al sol.
            else if (geometry_1.checkSunInsideTriangle(A, B, C, sunX, sunY)) {
                let perimeter = geometry_1.calculateTrianglePerimeter(A, B, C);
                weatherReport.setWeatherTypeAndPerimeter(weatherTypes_1.default.RAINY, perimeter);
                weatherReport;
            }
            //// Si no cumple ninguna regla, seteamos indefinido
            else {
                weatherReport.setWeatherType(weatherTypes_1.default.UNDEFINED);
            }
            return weatherReport;
        }
        throw new Error("the quantity and / or information of the planets is incorrect");
    }
    /// validamos los planetas
    static validateArguments(planets) {
        if (planets !== null && planets.length === 3) {
            return true;
        }
        else
            return false;
    }
}
exports.default = WeatherPrediction;
