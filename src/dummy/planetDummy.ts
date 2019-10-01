import planet from '../models/planet';

//// dummy class para generar los planetas en los test.
//// tambien funciona como data provider de planetas con tres funciones externas a la clase
class DummyPlanet extends planet {
    constructor(name : string, angleSpeed: number, radius: number, x: number, y: number) {
        super(name, angleSpeed, radius);
        this.x = x;
        this.y = y;
    }

    x: number = 0;
    y: number = 0;
    anglePosition: number = 0;

    //// setteamos la posicion de los planetas a 120 de distancia entre ellos
    //// para generar un perimetro suficiente para abarcar el sol
    static getPlanetArrayForRain() {
        let arr : Array<planet> = [getFerengi(), getBetasoide(), getVulcano()];
        arr.forEach((i, index) => {        
            i.anglePosition = 120*(++index);
            i.setCartesianPosition();
        });
        return arr;
    }

    //// seteamos los planetas en el punto de partida del job en donde y = 0
    static getPlanetArrayForDrought() {
        let arr : Array<planet> = [getFerengi(), getBetasoide(), getVulcano()];
        arr.forEach(i => {        
            i.setCartesianPosition();
        });
        return arr;
    }


    static getPlanetArrayForOptimum() {
        let arr : Array<planet> = [getFerengi(), getBetasoide(), getVulcano()];
        arr.forEach((i, index) => {        
            if(index < 2) {
                //// seteamos dos de los tres planetas multiplicando la velocidad angular por el multiplo comun minimo
                //// entre los tres planetas
                i.anglePosition = i.angleSpeed * 15;            
            }
            i.setCartesianPosition();
        });

        //// seteamos el tercer planeta en la misma linea de los otros dos puntos.
        let y = (arr[1].y * 2) - arr[0].y;
        let x = (arr[1].x * 2) - arr[0].x;
        arr[2].x = x;
        arr[2].y = y;
        return arr;
    }

    
}

function getFerengi() {
    return new planet("Ferengi", -1, 1500);
}

function getBetasoide() {
    return new planet("Betasoide", -3, 2000);
}


function getVulcano() {
    return new planet("vulcano", 5, 1000);    
}


export { getBetasoide, getFerengi, getVulcano, DummyPlanet};