import weatherReportService from '../services/weatherReportService';
import WeatherReport from '../models/weatherReport';
import { Request, Response, response } from 'express';

class weatherController {

    private weatherService = weatherReportService;
    

    async getWeatherByDay(req: Request, res: Response) {
        if(req.query && req.query.dia) {        
            let day = req.query.dia;
            day = parseInt(day);            
            if(day > 0) {
                try {
                    console.log("entering services");
                    
                    const report : any = await weatherReportService.getWeather(day);                    
                    const response = WeatherController.generateReportForResponse(report);
                    res.send(JSON.stringify(response));
                }
                catch(err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            }
        }
        else {
            return new Error("missing query");
        }
    }

    saveReports(reports : Array<WeatherReport>) {
        reports.forEach(report => {
            let info = this.weatherService.save(report);
        })
        console.log("All reports were saved.");
    }

    save(report: WeatherReport) {
        this.weatherService.save(report);
    }

    generateReportForResponse(report : any) {
        if(report._day != undefined && report.weatherType != undefined) 
            return {dia: report._day, clima: report.weatherType};
        else throw Error;
    }

}

export const WeatherController = new weatherController();