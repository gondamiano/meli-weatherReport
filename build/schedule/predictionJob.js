"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const logger_1 = __importDefault(require("../utils/logger"));
const solarSystem_1 = __importDefault(require("../models/solarSystem"));
const typeorm_1 = require("typeorm");
const weatherReport_1 = __importDefault(require("../models/weatherReport"));
const node_schedule_2 = require("node-schedule");
let rule = new node_schedule_2.RecurrenceRule();
rule.year = 1;
let q = node_schedule_1.default.scheduleJob(rule, function () {
    typeorm_1.createConnection({
        name: "dev",
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "localhost",
        database: "sampledb",
        entities: [weatherReport_1.default]
    }).then(connection => {
        logger_1.default.log("Prediction job starting...");
        solarSystem_1.default.startPrediction(1);
        logger_1.default.log("prediction job finished. Database updated.");
    }).catch(err => {
        logger_1.default.log(`Error with the database connection. Job was cancelled \n ${err.toString()}`);
    });
});
