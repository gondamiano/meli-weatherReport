import weatherReport from '../models/weatherReport';
import {getManager, getConnection, Repository} from 'typeorm';
import weatherTypes from '../models/weatherTypes';
import WeatherReport from '../models/weatherReport';

//// weather service
class weatherReportService {
    repository !: Repository<WeatherReport>;
    constructor() {

    }

    //// SELECT del clima para el dia especifico
    async getWeather(_day : number) {
        this.repository = getConnection().getRepository(weatherReport);
            const report = await this.repository.findOne({
                select: ["day", "weatherType"],
                 where: {
                    day: _day
                }
            })
            console.log(report);
            if(report != null && report != undefined) {
                return report;
            }
            else {
                throw new Error("No report for that specific day");
            }
    }

    //// insert or update de un reporte
    async save(report : weatherReport) {
        this.repository = getConnection().getRepository(weatherReport);
        this.repository.save(report)
            .then((result : any) => {return result})
            .catch((err : any) => {throw err;});
    }

    //// insert or update de todos los reportes a la vez.
    async saveAll(reports : Array<weatherReport>) {
        console.log("estamos aca : " + reports.length);
        this.repository = getConnection().getRepository(weatherReport);
        this.repository.save(reports)
            .then((result : any) => {return result})
            .catch((err : any) => {throw err;});
    }

    //// select de la ultima fecha de ejecucion del show
    async getLastUpdate() {
        this.repository = getConnection().getRepository(weatherReport);
        let date = await this.repository.findOne({
            select: ["updated_date"],
            order: {
                "day": "DESC",
            }
        });
        return date;
    }

    //// select de los dias con lluvia intensa
    async getHeavyRainyDays() {
        this.repository = getConnection().getRepository(weatherReport);
        let date = await this.repository.find({
            select: ["day"],
            where: {
                weatherType: weatherTypes.HEAVYRAIN,
            }
        });
        return date.map(i => (i.day));
    }
}

export default new weatherReportService();