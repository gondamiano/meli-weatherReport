'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var agent = require('@google-cloud/debug-agent').start();
var server = express_1.default();
require("reflect-metadata");
const weatherController_1 = require("./controllers/weatherController");
const typeorm_1 = require("typeorm");
const PORT = process.env.PORT || 8080;
server.get('/img', (req, res) => {
    res.send("Aca");
});
server.get('/', (req, res) => {
    res.send('hello world');
});
server.get('/clima', weatherController_1.WeatherController.getWeatherByDay);
typeorm_1.createConnection().then(conn => {
    console.log("Connection to database succesfull");
    server.listen(PORT, function () {
        console.log(`Server listen at ${PORT} port`);
    });
}).catch((err) => {
    console.log("Application couldn't connect to database");
});
