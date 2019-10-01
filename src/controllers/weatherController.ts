import weatherReportService from '../services/weatherReportService';
import WeatherReport from '../models/weatherReport';
import { Request, Response, response } from 'express';

class weatherController {

    private weatherService = weatherReportService;
    
    //// devuelve el clima del dia especificado
    async getWeatherByDay(req: Request, res: Response) {
        if(req.query && req.query.dia) {        
            let day = req.query.dia;
            day = parseInt(day);            
            if(day > 0) {
                try {                                        
                    const report : any = await weatherReportService.getWeather(day);                    
                    const response = WeatherController.generateReportForResponse(report);
                    return res.send(JSON.stringify(response));
                }
                catch(err) {
                    console.log(err);
                    return res.send(err);
                }
            }
            return res.sendStatus(400);
        }
        else {
            res.send(new Error("missing query"));
        }
    }

    //// guarda array de weatherReport entity
    saveReports(reports : Array<WeatherReport>) {
        reports.forEach(report => {
            let info = this.weatherService.save(report);
        })
        console.log("All reports were saved.");
    }

    //// genera el formato especifico de respuesta
    generateReportForResponse(report : any) {
        if(report.day != undefined && report.weatherType != undefined) 
            return {dia: report.day, clima: report.weatherType};
        else throw Error;
    }

}

export const WeatherController = new weatherController();