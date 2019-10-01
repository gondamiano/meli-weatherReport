import weatherReportService from '../services/weatherReportService';
import WeatherReport from '../models/weatherReport';
import { Request, Response, response } from 'express';
import reportService from '../services/reportService';
import Report from '../models/report';
import { format } from 'util';

class reportController {

    private reportService = reportService;

    //// devuelve el reporte de periodos con los dias de lluvia intensa
    async getFinalReport(req: Request, res: Response) {
        let reports = await reportService.getAll();
        let heavyRainyDay = await weatherReportService.getHeavyRainyDays();

        if(reports != undefined && heavyRainyDay != undefined) {
            let reportPresentation : string = ReportController.formatResponse(reports, heavyRainyDay);
            console.log(reportPresentation);
            res.send("<div>" + reportPresentation + "</div>");
        }
        else {
            res.sendStatus(404);
        }
    }
    
    formatResponse(reports: Report[], rainyDays : number[]) {
        let reportPresentation = reports.map(report => (
            ` ${report._periodAmount}  periodos de ${report.weatherType} <br> `
        ))
        
        reportPresentation.push("<br> dias en los que llovera intensamente: <br>");             
        let presentation = reportPresentation.join().replace(/,/g, " ");
        let rainDayString = rainyDays.toString();
        presentation +=  rainDayString;

        return presentation;
    }
}

export const ReportController = new reportController();