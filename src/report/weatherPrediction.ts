import Planet from "../models/planet";
import { isStraightLine, checkSunInsideTriangle, calculateTrianglePerimeter, heronFormula } from "../utils/geometry";
import weatherTypes from "../models/weatherTypes";
import WeatherReport from "../models/weatherReport";


//// Predice el clima utilizando functiones de calculos de la carpeta /utils
class WeatherPrediction {

    static predict(planets : Planet[], sunX: number, sunY : number) : WeatherReport {
        if(this.validateArguments(planets)) {            
            let A : Planet, B : Planet, C : Planet;        
            [A, B, C] = planets;
            const weatherReport : WeatherReport = new WeatherReport();
            // chequeamos si los planetas estan alineados con la formula Heron
            if(!heronFormula(A.x, A.y, B.x, B.y , C.x, C.y)) {
                //// si los tres planetas estan alineados, chequeamos si el sol tambien
                //// se encuentra alineado a los planetas.
                if(!heronFormula(A.x, A.y, B.x, B.y , sunX, sunY)) {                    
                    weatherReport.setWeatherType(weatherTypes.DROUGHT);                    
                }
                else {
                    weatherReport.setWeatherType(weatherTypes.OPTIMUM);                    
                }
            }
            /// Si los planetas no estan alineados, chequeamos si el perimetro formado
            /// por los planetas contienen al sol.
            else if(checkSunInsideTriangle(A, B, C , sunX, sunY)){                
                    let perimeter = calculateTrianglePerimeter(A, B, C);
                    weatherReport.setWeatherTypeAndPerimeter(weatherTypes.RAINY, perimeter);
                    weatherReport;
            } 
            //// Si no cumple ninguna regla, seteamos indefinido
            else {
                weatherReport.setWeatherType(weatherTypes.UNDEFINED);
            }
            return weatherReport;
        }
        throw new Error("the quantity and / or information of the planets is incorrect");
    }

    /// validamos los planetas
    private static validateArguments(planets : Planet[]) {
        if(planets !== null && planets.length === 3) {
            return true;
        }
        else 
            return false;
    }
}

export default WeatherPrediction;