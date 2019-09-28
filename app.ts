'use strict'

import express from 'express';
var server = express();
import "reflect-metadata";
import {createConnection} from 'typeorm';
import {Request, Response} from 'express';
import Logger from './utils/logger'
import WeatherReport from "./models/weatherReport";
import weatherTypes from "./models/weatherTypes";
import WeatherController from './controllers/weatherController';
import solarSystem from "./models/solarSystem";
import { log } from "util";
import bodyParser from 'body-parser';

server.use(bodyParser.json());

const PORT = process.env.PORT || 8090;

server.get('/img' , (req, res) => {
    res.send("Aca");
})

server.get('/', (req :any, res: any) => {
    res.send('hello world');
})

server.get('/clima', WeatherController.getWeatherByDay);

createConnection({
    name: "server",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "localhost",
    database: "sampledb",
    entities: [WeatherReport]
  }).then(connection => {
    server.listen(8080, () => {        
        console.log(connection);
        console.log('====================================');
        console.log("aca esamos piola");
        
    })
}).catch(err => {
    Logger.log('error', err.toString());
})


server.listen(PORT, function() {
    console.log("Listen port");
});
