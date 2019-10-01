import {expect} from 'chai';
import 'mocha';
import weatherTypes from '../src/models/weatherTypes';
import { isStraightLine, heronFormula } from '../src/utils/geometry';
import { getPlanetArrayForDrought, getPlanetArrayForRain } from '../src/dummy/planetDummy';

describe('Testing geometry', function() {
    it('Should return true for straigth line with the sun', function() {
        let res = getPlanetArrayForDrought();
        let [A,B,C] = res;
        let result = heronFormula(A.x, A.y, B.x, B.y, C.x, C.y);
        let result2 = heronFormula(A.x, A.y, B.x, B.y, 0, 0);
        expect(result).to.be.equal(0);
        expect(result2).to.be.equal(0);
        //+let result = isStraightLine(482.96, 129.41, 965.93, 258.82, -1931.85, -517.64);
        //expect(result).to.be.true;
    });
    it("should return True for area != 0", function() {
        let arr = getPlanetArrayForRain();
        let [A,B,C] = arr;
        let result = heronFormula(A.x, A.y, B.x, B.y, C.x, C.y);        
        expect(result).not.be.equal(0);
    })

});