"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const weatherPrediction_1 = __importDefault(require("../report/weatherPrediction"));
const planetDummy_1 = require("../dummy/planetDummy");
const weatherTypes_1 = __importDefault(require("../models/weatherTypes"));
describe('testing prediction', function () {
    it("should return DROUGHT", function () {
        let arr = planetDummy_1.getPlanetArrayForDrought();
        let result = weatherPrediction_1.default.predict(arr, 0, 0);
        chai_1.expect(result.weatherType).to.equal(weatherTypes_1.default.DROUGHT);
    });
    it("should return OPTIMUM", function () {
        let arr = planetDummy_1.getPlanetArrayForOptimum();
        let result = weatherPrediction_1.default.predict(arr, 0, 0);
        chai_1.expect(result.weatherType).to.equal(weatherTypes_1.default.OPTIMUM);
    });
    it("Should return RAINY", function () {
        let arr = planetDummy_1.getPlanetArrayForRain();
        let result = weatherPrediction_1.default.predict(arr, 0, 0);
        chai_1.expect(result.weatherType).to.equal(weatherTypes_1.default.RAINY);
    });
});
