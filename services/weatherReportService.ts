import weatherReport from '../models/weatherReport';
import {getManager, getConnection} from 'typeorm';
import weatherTypes from '../models/weatherTypes';

class weatherReportService {
    repository: any;
    constructor() {

    }

    async getWeather(day : number) {
        this.repository = getConnection().getRepository(weatherReport);
            const report = await this.repository.findOne({
                select: ["_day", "weatherType"],
                 where: {
                    _day: day
                }
            });

            if(report != null || report != undefined) {
                return report;
            }
            else {
                throw new Error("No report for that specific day");
            }
    }

    async save(report : weatherReport) {
        this.repository = getConnection().getRepository(weatherReport);
        this.repository.save(report)
            .then((result : any) => {return result})
            .catch((err : any) => {throw err;});
    } 
}

export default new weatherReportService();