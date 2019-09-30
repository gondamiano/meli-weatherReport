'use strict'

import express, { Request, Response } from 'express';
var agent = require('@google-cloud/debug-agent').start();
var server = express();
import "reflect-metadata";
import {WeatherController} from './controllers/weatherController';
import { createConnection } from 'typeorm';
import solarSystem from './models/solarSystem';

const PORT = process.env.PORT || 8080;


server.get('/', (req :Request, res: Response) => {
    res.sendStatus(200);
});

server.get('/predict', (req: Request, res: Response) => {
    const result = solarSystem.startPrediction(10);
    if(result) {
        res.send("OK");
    }
    else {
        res.send("FAIL");
    }
})

server.get('/clima', WeatherController.getWeatherByDay);

createConnection().then(conn => {        
    console.log("successful Database Connection");    
    server.listen(PORT, function() {
        console.log(`Server listen at ${PORT} port`);        
    })
}).catch((err) => {
    console.log("Application couldn't connect to database");
});    