import Planet from './planet'
import {getBetasoide, getFerengi, getVulcano } from '../dummy/planetDummy'
import weatherTypes from './weatherTypes'
import WeatherReport from './weatherReport'
import WeatherPrediction from '../report/weatherPrediction'
import Logger from '../utils/logger';
import reportGenerator from '../report/reportGenerator'
import weatherReportService from '../services/weatherReportService'
import { createConnection } from 'typeorm'
import { log } from 'util'

class solarSystem {    
    planets!: Array<Planet>
    readonly x : number = 0
    readonly y : number = 0
    private days_year : number = 360
    public actualDays : number = 1;
    
    get days_per_year() { 
        return this.days_year; 
    }

    addPlanets (...planets : Array<Planet>) {
        this.planets = [...planets];
        console.log('====================================');
        console.log(planets[0]);
        console.log('====================================');
        debugger;
        console.log(this.planets);
    }

    startPrediction (years: number) {
        console.clear()
        this.addPlanets(getBetasoide(), getFerengi(), getVulcano())        
        Logger.log(`Start prediction and the creating of the report for the next ${years} `)
        let totalDays : number = years * this.days_per_year;
        const reports : Array<WeatherReport> = new Array<WeatherReport>();
        for(let i = 0; i < totalDays; i++) {            
            const result : WeatherReport = WeatherPrediction.predict(this.planets, this.x, this.y);
            result.day = this.actualDays++;
            if(result.day == 815) {
                debugger;
            }
            //Logger.log(JSON.stringify(result) + ` ${this.planets[0].name} = (${this.planets[0].x},${this.planets[0].y})                  ${this.planets[1].name} = (${this.planets[1].x},${this.planets[1].y})                   ${this.planets[2].name} =        (${this.planets[2].x}, ${this.planets[2].y})  `);
            Logger.log(JSON.stringify(result) + ` A = ${this.planets[0].anglePosition}   ---- B = ${this.planets[1].anglePosition} ---------- C = ${this.planets[2].anglePosition}`);
            reports.push(result);
            reportGenerator.fill(result);
            this.planets.forEach(i => i.move()); 
        }
        this.saveReports(reports).catch(err => {
            throw new Error(err);
        });
    }

    async saveReports(result : Array<WeatherReport>) {
        try {            
            let maxPerimeter = Math.max.apply(Math, result.map((i) => {
                return i.perimeter;
            }));
            let rainyDay = result.find(i => i.perimeter === maxPerimeter);
            (rainyDay !== undefined) ? rainyDay.maximumRain = true : false;
            let DBresponse = result.map(async report => {
                if(report.perimeter === maxPerimeter) {
                    report.setHeavyRain();              
                }
                weatherReportService.save(report).catch((err) => 
                {
                    Logger.log(err);
                    console.log('====================================');
                    console.log("FALLO");
                    console.log('====================================');                    
                });
            })
        }
        catch(err) {
            Logger.error("Error at saving reports" + err.toString());
            new Error("Error at saving reports");
        }
    }
}

createConnection({
    name: "dev",
    type: "mysql",
    host: "127.0.0.1",
    port: 3366,
    username: "root",
    password: "root",
    database: "weatherReport",
    entities: [WeatherReport]
  }).then(connection => {      
    let a = new solarSystem();
    a.startPrediction(5);
    }).catch(err => {
    Logger.log('error', err.toString());
})


export default new solarSystem();