import solarSystem from '../models/solarSystem';
import { createConnection } from 'typeorm';
import WeatherReport from '../models/weatherReport';
import { Request, Response } from 'express';
import weatherReportService from '../services/weatherReportService';
import { isDate } from 'util';

class predictionJob {


    async calculate(req: Request, res: Response) {
        let report = await weatherReportService.getLastUpdate();
        if(report != undefined && predictionJob.isTheRightTime(report))  {            
             let result = solarSystem.startPrediction(10);
             if(result) {
                 console.log("Prediction successful. Database updated.")
                 res.sendStatus(200);
             }
             else {
                 console.log("Prediction failed. try again next year, haha.")
                 res.sendStatus(400);
             }            
        }
        else {
            console.log("is not the right time");
            res.sendStatus(404);
        }        
    }

    static isTheRightTime(report : WeatherReport) {
        let date : Date = report.updated_date;
        let actualDate : Date = new Date;

        date.setFullYear(date.getFullYear() + 10);
        if(date < actualDate) {
            return true;
        }
        else {
            return false;
        }
    }

};

export default new predictionJob;