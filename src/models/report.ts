import weatherTypes from "./weatherTypes";
import {Entity, Column, PrimaryColumn} from 'typeorm';

/// Report entity utilizando typeorm como orm para la comunicacion de mysql a traves de typescript
@Entity()
class Report {
    
    @Column()
    private periodAmount: number = 0;

    @PrimaryColumn()
    public weatherType !: string;
    set _periodAmount(val : number) {
        this.periodAmount = val;
    }

    get _periodAmount() {
        return this.periodAmount;
    }

    setWeatherType(weatherType: string): void {        
        this.weatherType = weatherType;
    }

    fill(weatherType : string , count : number) {
        this.setWeatherType(weatherType);
        this._periodAmount = count;
    }
    
}

export default Report;