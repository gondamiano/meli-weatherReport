'use strict'

import express, { Request, Response } from 'express';

////  depurador para app engine
var agent = require('@google-cloud/debug-agent').start();
var server = express();
import "reflect-metadata";
import {WeatherController} from './src/controllers/weatherController';
import { createConnection } from 'typeorm';
import predictionJob from './src/schedule/predictionJob';
import { ReportController } from './src/controllers/reportController';

const PORT = process.env.PORT || 8080;

//// endpoint para el job. se dispara a traves de cron.yaml
server.get('/predict', predictionJob.calculate);

//// endpoint para los otros planetas
server.get('/clima', WeatherController.getWeatherByDay);

//// devuelve el reporte de los periodos
server.get('/report', ReportController.getFinalReport);


createConnection().then(conn => {        
    console.log("successful Database Connection");    
    server.listen(PORT, function() {
        console.log(`Server listen at ${PORT} port`);        
    })
}).catch((err) => {
    console.log("Application couldn't connect to database");
});    