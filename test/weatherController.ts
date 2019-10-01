import {expect} from 'chai';
import 'mocha';
import weatherTypes from '../src/models/weatherTypes';
import {WeatherController} from '../src/controllers/weatherController';
import { response, request } from 'express';

describe("Testing weather controller", function () {
    it("should return Error for undefined query" , async function() {
        let err = await WeatherController.getWeatherByDay(request, response);
        expect(err).to.instanceOf(Error);
    });
})