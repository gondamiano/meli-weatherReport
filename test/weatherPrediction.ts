import {expect} from 'chai';
import 'mocha';
import WeatherPrediction from '../src/report/weatherPrediction';
import { DummyPlanet } from '../src/dummy/planetDummy';
import weatherTypes from '../src/models/weatherTypes';

describe('testing prediction', function() {
        it("should return DROUGHT", function() {
            let arr = DummyPlanet.getPlanetArrayForDrought();
            let result = WeatherPrediction.predict(arr, 0 ,0);
            expect(result.weatherType).to.equal(weatherTypes.DROUGHT);
        });
        it("should return OPTIMUM", function() {
            let arr = DummyPlanet.getPlanetArrayForOptimum();
            let result = WeatherPrediction.predict(arr, 0 ,0);
            expect(result.weatherType).to.equal(weatherTypes.OPTIMUM);
        });
        it("Should return RAINY", function() {
            let arr = DummyPlanet.getPlanetArrayForRain();
            let result = WeatherPrediction.predict(arr, 0 ,0);
            expect(result.weatherType).to.equal(weatherTypes.RAINY);
        })
});