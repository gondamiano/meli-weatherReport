"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const weatherController_1 = require("../controllers/weatherController");
const express_1 = require("express");
describe("Testing weather controller", function () {
    it("should return Error for undefined query", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let err = yield weatherController_1.WeatherController.getWeatherByDay(express_1.request, express_1.response);
            chai_1.expect(err).to.instanceOf(Error);
        });
    });
});
