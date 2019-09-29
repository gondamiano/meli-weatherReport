'use strict'

import express from 'express';
var agent = require('@google-cloud/debug-agent').start();
var server = express();
import "reflect-metadata";
import {WeatherController} from './controllers/weatherController';
import { createConnection } from 'typeorm';

const PORT = process.env.PORT || 8080;


server.get('/', (req :any, res: any) => {
    res.send('hello world');
});

server.get('/clima', WeatherController.getWeatherByDay);

createConnection().then(conn => {        
    console.log("Connection to database succesfull");    
    server.listen(PORT, function() {
        console.log(`Server listen at ${PORT} port`);        
    })
}).catch((err) => {
    console.log("Application couldn't connect to database");
});    