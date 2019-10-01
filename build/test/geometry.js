"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const geometry_1 = require("../src/utils/geometry");
const planetDummy_1 = require("../src/dummy/planetDummy");
describe('Testing geometry', function () {
    it('Should return true for straigth line with the sun', function () {
        let res = planetDummy_1.getPlanetArrayForDrought();
        let [A, B, C] = res;
        let result = geometry_1.heronFormula(A.x, A.y, B.x, B.y, C.x, C.y);
        let result2 = geometry_1.heronFormula(A.x, A.y, B.x, B.y, 0, 0);
        chai_1.expect(result).to.be.equal(0);
        chai_1.expect(result2).to.be.equal(0);
        //+let result = isStraightLine(482.96, 129.41, 965.93, 258.82, -1931.85, -517.64);
        //expect(result).to.be.true;
    });
    it("should return True for area != 0", function () {
        let arr = planetDummy_1.getPlanetArrayForRain();
        let [A, B, C] = arr;
        let result = geometry_1.heronFormula(A.x, A.y, B.x, B.y, C.x, C.y);
        chai_1.expect(result).not.be.equal(0);
    });
});
