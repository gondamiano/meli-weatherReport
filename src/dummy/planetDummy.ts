import planet from '../models/planet';

class DummyPlanet extends planet {
    constructor(name : string, angleSpeed: number, radius: number, x: number, y: number) {
        super(name, angleSpeed, radius);
        this.x = x;
        this.y = y;
    }

    x: number = 0;
    y: number = 0;
    anglePosition: number = 0;
}

function getFerengi() {
    return new DummyPlanet("Ferengi", -1, 1500, 0, 0);
}

function getBetasoide() {
    return new DummyPlanet("Betasoide", -3, 2000, 0, 0);
}


function getVulcano() {
    return new DummyPlanet("vulcano", 5, 1000, 0, 0);    
}

function getPlanetArrayForRain() {
    let arr : Array<planet> = [getFerengi(), getBetasoide(), getVulcano()];
    arr.forEach((i, index) => {        
        i.anglePosition = 120*(++index);
        i.setCartesianPosition();
    });
    return arr;
}

function getPlanetArrayForDrought() {
    let arr : Array<planet> = [getFerengi(), getBetasoide(), getVulcano()];
    arr.forEach(i => {        
        i.setCartesianPosition();
    });
    return arr;
}

function getPlanetArrayForOptimum() {
    let arr : Array<planet> = [getFerengi(), getBetasoide(), getVulcano()];
    arr.forEach((i, index) => {        
        if(index < 2) {
            i.anglePosition = i.angleSpeed * 15;            
        }
        i.setCartesianPosition();
    });
    let y = (arr[1].y * 2) - arr[0].y;;
    let x = (arr[1].x * 2) - arr[0].x;
    arr[2].x = x;
    arr[2].y = y;
    return arr;
}


export { getBetasoide, getFerengi, getVulcano, getPlanetArrayForDrought, getPlanetArrayForRain, getPlanetArrayForOptimum};