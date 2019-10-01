//// planet model
class Planet {
    constructor(name : string, angleSpeed: number, radius: number) {
        this._angleSpeed = angleSpeed;
        this._name = name;
        this._radius = radius;
    }

    private _x: number = 0;
    private _y: number = 0;
    anglePosition: number = 0;
    private _name: string;
    private _angleSpeed : number;
    private _radius: number = 0;

    get name () {
        return this._name;
    }

    get angleSpeed () {
        return this._angleSpeed
    }

    get radius () {
        return this._radius;
    }

    get x() : number {
        return this._x;
    }

    get y() : number {
        return this._y;
    }

    set x(val : number) {        
        //this._x = Math.round(val);
        let qw = val.toFixed(2);
        this._x = parseFloat(qw);
    }
    
    set y(val : number) {        
        let qw = val.toFixed(2)
        this._y = parseFloat(qw);
        //this._y = Math.round(val);
    }

    /// devuelve la distancia del planeta con respecto a otro que se pasa como parametro
    getDistance(planet : Planet) {
        let distance : number = Math.pow((planet.x - this.x), 2) + Math.pow((this.y - planet.y), 2)
        distance = Math.sqrt(distance);
        return Math.round(distance);
    }

    /// setea el eje cartesiano del planeta
    setCartesianPosition() {
        /// utilizamos el angulo de posicion en radianes 
        this.x = Math.cos(this.anglePosition*(Math.PI/180)) * this.radius;
        this.y = Math.sin(this.anglePosition*(Math.PI/180)) * this.radius;
    }

    /// realiza el movimiento del planeta y modificamos el angulo.
    move() {
        this.anglePosition = this.anglePosition + this.angleSpeed;
        if(Math.abs(this.anglePosition) >= 360) {
            if(this.anglePosition > 0) {
                this.anglePosition -=360;
            }
            else {
                this.anglePosition += 360;
            }
        }
        this.setCartesianPosition();
    }

}

export default Planet;