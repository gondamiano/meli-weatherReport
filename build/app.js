'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
////  depurador para app engine
var agent = require('@google-cloud/debug-agent').start();
var server = express_1.default();
require("reflect-metadata");
const weatherController_1 = require("./src/controllers/weatherController");
const typeorm_1 = require("typeorm");
const predictionJob_1 = __importDefault(require("./src/schedule/predictionJob"));
const reportController_1 = require("./src/controllers/reportController");
const PORT = process.env.PORT || 8080;
//// endpoint para el job. se dispara a traves de cron.yaml
server.get('/predict', predictionJob_1.default.calculate);
//// endpoint para los otros planetas
server.get('/clima', weatherController_1.WeatherController.getWeatherByDay);
//// devuelve el reporte de los periodos
server.get('/report', reportController_1.ReportController.getFinalReport);
typeorm_1.createConnection().then(conn => {
    console.log("successful Database Connection");
    server.listen(PORT, function () {
        console.log(`Server listen at ${PORT} port`);
    });
}).catch((err) => {
    console.log("Application couldn't connect to database");
});
