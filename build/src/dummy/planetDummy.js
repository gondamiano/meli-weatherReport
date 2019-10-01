"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const planet_1 = __importDefault(require("../models/planet"));
//// dummy class para generar los planetas en los test.
//// tambien funciona como data provider de planetas con tres funciones externas a la clase
class DummyPlanet extends planet_1.default {
    constructor(name, angleSpeed, radius, x, y) {
        super(name, angleSpeed, radius);
        this.x = 0;
        this.y = 0;
        this.anglePosition = 0;
        this.x = x;
        this.y = y;
    }
    //// setteamos la posicion de los planetas a 120 de distancia entre ellos
    //// para generar un perimetro suficiente para abarcar el sol
    static getPlanetArrayForRain() {
        let arr = [getFerengi(), getBetasoide(), getVulcano()];
        arr.forEach((i, index) => {
            i.anglePosition = 120 * (++index);
            i.setCartesianPosition();
        });
        return arr;
    }
    //// seteamos los planetas en el punto de partida del job en donde y = 0
    static getPlanetArrayForDrought() {
        let arr = [getFerengi(), getBetasoide(), getVulcano()];
        arr.forEach(i => {
            i.setCartesianPosition();
        });
        return arr;
    }
    static getPlanetArrayForOptimum() {
        let arr = [getFerengi(), getBetasoide(), getVulcano()];
        arr.forEach((i, index) => {
            if (index < 2) {
                //// seteamos dos de los tres planetas multiplicando la velocidad angular por el multiplo comun minimo
                //// entre los tres planetas
                i.anglePosition = i.angleSpeed * 15;
            }
            i.setCartesianPosition();
        });
        //// seteamos el tercer planeta en la misma linea de los otros dos puntos.
        let y = (arr[1].y * 2) - arr[0].y;
        let x = (arr[1].x * 2) - arr[0].x;
        arr[2].x = x;
        arr[2].y = y;
        return arr;
    }
}
exports.DummyPlanet = DummyPlanet;
function getFerengi() {
    return new planet_1.default("Ferengi", -1, 1500);
}
exports.getFerengi = getFerengi;
function getBetasoide() {
    return new planet_1.default("Betasoide", -3, 2000);
}
exports.getBetasoide = getBetasoide;
function getVulcano() {
    return new planet_1.default("vulcano", 5, 1000);
}
exports.getVulcano = getVulcano;
