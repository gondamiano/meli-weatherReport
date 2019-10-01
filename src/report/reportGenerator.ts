import Logger from '../utils/logger'
import WeatherReport from '../models/weatherReport';
import Report from '../models/report';
import WeatherTypes from '../models/weatherTypes'
import weatherTypes from '../models/weatherTypes';
import reportService from '../services/reportService';


class reportGenerator {
    reports: Array<Report> = new Array;    

    show() {
        console.log("info","Report created succesfully.");
        console.log(JSON.stringify(this.reports));
    }

    createFinalReport(data : Array<WeatherReport>) {
        let types = Object.values<string>(WeatherTypes);
        for(let values of types) {
            let report : Report = new Report();
            let count = data.filter(i => i.weatherType === values).length;            
            report.fill(values, count);
            this.reports.push(report);
        };

        reportService.save(this.reports).catch(err => (err));
    }

}

export default new reportGenerator;