'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var server = express_1.default();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const logger_1 = __importDefault(require("./utils/logger"));
const weatherReport_1 = __importDefault(require("./models/weatherReport"));
const weatherController_1 = __importDefault(require("./controllers/weatherController"));
const body_parser_1 = __importDefault(require("body-parser"));
server.use(body_parser_1.default.json());
const PORT = process.env.PORT || 8090;
server.get('/img', (req, res) => {
    res.send("Aca");
});
server.get('/', (req, res) => {
    res.send('hello world');
});
server.get('/clima', weatherController_1.default.getWeatherByDay);
typeorm_1.createConnection({
    name: "server",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "localhost",
    database: "sampledb",
    entities: [weatherReport_1.default]
}).then(connection => {
    server.listen(8080, () => {
        console.log(connection);
        console.log('====================================');
        console.log("aca esamos piola");
    });
}).catch(err => {
    logger_1.default.log('error', err.toString());
});
server.listen(PORT, function () {
    console.log("Listen port");
});
