import Planet from './planet'
import {getBetasoide, getFerengi, getVulcano } from '../dummy/planetDummy'
import WeatherReport from './weatherReport'
import WeatherPrediction from '../report/weatherPrediction'
import reportGenerator from '../report/reportGenerator'
import weatherReportService from '../services/weatherReportService'

class solarSystem {    
    planets!: Array<Planet>
    readonly x : number = 0
    readonly y : number = 0
    private days_year : number = 360
    public actualDays : number = 0;
    
    get days_per_year() { 
        return this.days_year; 
    }

    addPlanets (...planets : Array<Planet>) {
        if(planets.length === 3) {
            this.planets = [...planets];
        }        
    }

    startPrediction (years: number) : boolean {
        this.actualDays = 1;
        this.addPlanets(getBetasoide(), getFerengi(), getVulcano())        
        console.log(`Start prediction and the creating of the report for the next ${years} `)
        let totalDays : number = years * this.days_per_year;
        const reports : Array<WeatherReport> = new Array<WeatherReport>();

        for(let i = 0; i < totalDays; i++) {            
            const result : WeatherReport = WeatherPrediction.predict(this.planets, this.x, this.y);
            result. day = this.actualDays++;      
            reports.push(result);
            this.planets.forEach(i => i.move()); 
        }        

        this.saveReports(reports)        
        .catch(err => {
            console.log(err.toString());
            return false;
        });
        console.log("Bestial");
        return true;
    }

    async saveReports(result : Array<WeatherReport>) {
        try {            
            let maxPerimeter = Math.max.apply(Math, result.map((i) => {
                return i.perimeter;
            }));
            let rainyDay = result.find(i => i.perimeter === maxPerimeter);
            (rainyDay !== undefined) ? rainyDay.maximumRain = true : false;
            let finalReport = await result.map(async report => {
                if(report.perimeter === maxPerimeter) {
                    report.setHeavyRain();
                }                               
            });
            weatherReportService.saveAll(result).catch((err) => {
                return err;
            }) 
            reportGenerator.createFinalReport(result);
        }
        catch(err) {                
                throw new Error("Error at saving reports");            
        }
    }
}

export default new solarSystem();