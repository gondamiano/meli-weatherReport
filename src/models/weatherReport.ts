import weatherTypes from "./weatherTypes";
import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
class WeatherReport {        
    
    @PrimaryColumn()
    public day: number = 0;

    @Column()
    public weatherType !: string;

    @Column()
    public maximumRain : boolean = false;

    @Column('double')
    public perimeter : number = 0;

    @Column("datetime")
    public updated_date : Date = new Date();

    setWeatherType(weatherType: weatherTypes): void {        
        this.weatherType = weatherType;
    }

    setWeatherTypeAndPerimeter(weatherType : weatherTypes, perimeter: number): void {
        this.weatherType = weatherType;
        this.perimeter = perimeter;
    }

    setHeavyRain() : void {
        this.setWeatherType(weatherTypes.HEAVYRAIN);
        this.maximumRain = true;
    }
}

export default WeatherReport;