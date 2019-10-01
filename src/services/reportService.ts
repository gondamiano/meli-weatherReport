import weatherReport from '../models/weatherReport';
import {getManager, getConnection, Repository} from 'typeorm';
import weatherTypes from '../models/weatherTypes';
import Report from '../models/report';


//// Report Service utilizando typeorm
class ReportService {
    repository !: Repository<Report>;
    constructor() {

    }
    
    async save(report : Array<Report>) {
        this.repository = getConnection().getRepository(Report);
        this.repository.save(report).then(() => {
            console.log('saved correctly');
            return true;
        }).catch(err => {
            console.log('error');
            throw err;
        })
    }

    async getAll() {
        this.repository = getConnection().getRepository(Report);
        let reports = await this.repository.find();        

        if(reports != undefined) {
            return reports;
        }
        else {
            throw new Error;
        }
    }

}

export default new ReportService();
