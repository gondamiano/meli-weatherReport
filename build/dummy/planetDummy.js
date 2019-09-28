"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const planet_1 = __importDefault(require("../models/planet"));
class DummyPlanet extends planet_1.default {
    constructor(name, angleSpeed, radius, x, y) {
        super(name, angleSpeed, radius);
        this.x = 0;
        this.y = 0;
        this.anglePosition = 0;
        this.x = x;
        this.y = y;
    }
}
function getFerengi() {
    return new DummyPlanet("Ferengi", -1, 1500, 0, 0);
}
exports.getFerengi = getFerengi;
function getBetasoide() {
    return new DummyPlanet("Betasoide", -3, 2000, 0, 0);
}
exports.getBetasoide = getBetasoide;
function getVulcano() {
    return new DummyPlanet("vulcano", 5, 1000, 0, 0);
}
exports.getVulcano = getVulcano;
function getPlanetArrayForRain() {
    let arr = [getFerengi(), getBetasoide(), getVulcano()];
    arr.forEach((i, index) => {
        i.anglePosition = 120 * (++index);
        i.setCartesianPosition();
    });
    return arr;
}
exports.getPlanetArrayForRain = getPlanetArrayForRain;
function getPlanetArrayForDrought() {
    let arr = [getFerengi(), getBetasoide(), getVulcano()];
    arr.forEach(i => {
        i.setCartesianPosition();
    });
    return arr;
}
exports.getPlanetArrayForDrought = getPlanetArrayForDrought;
function getPlanetArrayForOptimum() {
    let arr = [getFerengi(), getBetasoide(), getVulcano()];
    arr.forEach((i, index) => {
        if (index < 2) {
            i.anglePosition = i.angleSpeed * 15;
        }
        i.setCartesianPosition();
    });
    let y = (arr[1].y * 2) - arr[0].y;
    ;
    let x = (arr[1].x * 2) - arr[0].x;
    arr[2].x = x;
    arr[2].y = y;
    return arr;
}
exports.getPlanetArrayForOptimum = getPlanetArrayForOptimum;
