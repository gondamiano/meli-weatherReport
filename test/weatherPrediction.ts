import {expect} from 'chai';
import 'mocha';
import WeatherPrediction from '../report/weatherPrediction';
import { getPlanetArrayForDrought, getPlanetArrayForOptimum, getPlanetArrayForRain } from '../dummy/planetDummy';
import weatherTypes from '../models/weatherTypes';

describe('testing prediction', function() {
        it("should return DROUGHT", function() {
            let arr = getPlanetArrayForDrought();
            let result = WeatherPrediction.predict(arr, 0 ,0);
            expect(result.weatherType).to.equal(weatherTypes.DROUGHT);
        });
        it("should return OPTIMUM", function() {
            let arr = getPlanetArrayForOptimum();
            let result = WeatherPrediction.predict(arr, 0 ,0);
            expect(result.weatherType).to.equal(weatherTypes.OPTIMUM);
        });
        it("Should return RAINY", function() {
            let arr = getPlanetArrayForRain();
            let result = WeatherPrediction.predict(arr, 0 ,0);
            expect(result.weatherType).to.equal(weatherTypes.RAINY);
        })
});