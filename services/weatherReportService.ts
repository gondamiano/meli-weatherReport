import weatherReport from '../models/weatherReport';
import {getManager} from 'typeorm';
import weatherTypes from '../models/weatherTypes';

class weatherReportService {
    repository: any;
    constructor() {

    }

    getWeather(day : number) {
        this.repository = getManager("server").getRepository(weatherReport);
            const report = this.repository.findOne({
                 where: {
                    _day: day
                }
            });
            if(report != null) {
                return report;
            }
            else {
                throw new Error("No report for that specific day");
            }
    }

    async save(report : weatherReport) {
        this.repository = getManager("dev").getRepository(weatherReport).manager;
        this.repository.save(report)
            .then((result : any) => {return result})
            .catch((err : any) => {throw err;});
    } 
}

export default new weatherReportService();