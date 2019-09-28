import Logger from '../utils/logger'
import WeatherReport from '../models/weatherReport';


class reportGenerator {
    periodAmount : any = {};

    create(data : Array<WeatherReport>) {
        data.forEach(report => {
            if(this.periodAmount[report.weatherType]) {
                this.periodAmount[report.weatherType] += 1;
            }
            else {
                this.periodAmount[report.weatherType] = 1;
            }
        })
       this.show();
    }

    show() {
        Logger.log("info","Report created succesfully.");
        Logger.log(JSON.stringify(this.periodAmount));
    }

    fill(data : WeatherReport) {
        if(this.periodAmount[data.weatherType]) {
            this.periodAmount[data.weatherType] += 1;
        }
        else {
            this.periodAmount[data.weatherType] = 1;
        }
    }
}

export default new reportGenerator;