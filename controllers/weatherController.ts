import weatherReportService from '../services/weatherReportService';
import WeatherReport from '../models/weatherReport';
import Logger from '../utils/logger';
import { Request, Response, response } from 'express';

class weatherController {

    private weatherService = weatherReportService;
    

    async getWeatherByDay(req: Request, res: Response) {
        if(req.query && req.query.dia) {        
            let day = req.query.dia;
            day = parseInt(day);            
            if(day > 0) {
                try {
                    const report : any = await weatherReportService.getWeather(day);
                    res.send(JSON.stringify(report));
                }
                catch(err) {
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
        Logger.log("All reports were saved.");
    }

    save(report: WeatherReport) {
        this.weatherService.save(report);
    }

}

export default new weatherController();