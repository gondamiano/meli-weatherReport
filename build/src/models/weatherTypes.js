"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// enum con los tipos de climas establecidos
var weatherTypes;
(function (weatherTypes) {
    weatherTypes["DROUGHT"] = "Sequ\u00EDa";
    weatherTypes["OPTIMUM"] = "\u00D3ptimo";
    weatherTypes["RAINY"] = "Lluvia";
    weatherTypes["HEAVYRAIN"] = "Lluvia intensa";
    weatherTypes["UNDEFINED"] = "Indefinido";
})(weatherTypes || (weatherTypes = {}));
exports.default = weatherTypes;
