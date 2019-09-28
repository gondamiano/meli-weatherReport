import schedule from 'node-schedule';
import Logger from '../utils/logger';
import solarSystem from '../models/solarSystem';
import { createConnection } from 'typeorm';
import WeatherReport from '../models/weatherReport';
import { RecurrenceRule } from 'node-schedule';
import { log } from 'util';

let rule = new RecurrenceRule();
rule.year = 1;

let q = schedule.scheduleJob(rule, function() {

    createConnection({
        name: "dev",
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "localhost",
        database: "sampledb",
        entities: [WeatherReport]
    }).then(connection => {
        Logger.log("Prediction job starting...");
        solarSystem.startPrediction(1);
        Logger.log("prediction job finished. Database updated.");      
        }).catch(err => {
        Logger.log(`Error with the database connection. Job was cancelled \n ${err.toString()}`);
    })
});
