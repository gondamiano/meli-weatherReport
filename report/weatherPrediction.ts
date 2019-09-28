import Planet from "../models/planet";
import { isStraightLine, checkSunInsideTriangle, calculateTrianglePerimeter, heronFormula } from "../utils/geometry";
import weatherTypes from "../models/weatherTypes";
import WeatherReport from "../models/weatherReport";


class WeatherPrediction {

    static predict(planets : Planet[], sunX: number, sunY : number) : WeatherReport {
        if(this.validateArguments(planets)) {            
            let A : Planet, B : Planet, C : Planet;        
            [A, B, C] = planets;
            const weatherReport : WeatherReport = new WeatherReport();
            // check if the planets are align in straigth line
            if(!heronFormula(A.x, A.y, B.x, B.y , C.x, C.y)) {
                //// if the three points form a straigth line, we check if the sun is align to.
                if(!heronFormula(A.x, A.y, B.x, B.y , sunX, sunY)) {                    
                    weatherReport.setWeatherType(weatherTypes.DROUGHT);                    
                }
                else {
                    weatherReport.setWeatherType(weatherTypes.OPTIMUM);                    
                }
            }
            /// calculate the perimeter and check if the sun is inside
            else if(checkSunInsideTriangle(A, B, C , sunX, sunY)){                
                    let perimeter = calculateTrianglePerimeter(A, B, C, sunX, sunY);
                    weatherReport.setWeatherTypeAndPerimeter(weatherTypes.RAINY, perimeter);
                    weatherReport;
            } 
            else {
                weatherReport.setWeatherType(weatherTypes.UNDEFINED);
            }
            return weatherReport;
        }
        throw new Error("the quantity and / or information of the planets is incorrect");
    }

    private static validateArguments(planets : Planet[]) {
        if(planets !== null && planets.length === 3) {
            return true;
        }
        else 
            return false;
    }
}

export default WeatherPrediction;