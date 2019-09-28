import {expect} from 'chai';
import 'mocha';
import weatherTypes from '../models/weatherTypes';
import weatherController from '../controllers/weatherController';
import { response, request } from 'express';

describe("Testing weather controller", function () {
    it("should return Error for undefined query" , async function() {
        let err = await weatherController.getWeatherByDay(request, response);
        expect(err).to.instanceOf(Error);
    });
})