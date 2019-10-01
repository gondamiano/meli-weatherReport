"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
/// Report entity utilizando typeorm como orm para la comunicacion de mysql a traves de typescript
let Report = class Report {
    constructor() {
        this.periodAmount = 0;
    }
    set _periodAmount(val) {
        this.periodAmount = val;
    }
    get _periodAmount() {
        return this.periodAmount;
    }
    setWeatherType(weatherType) {
        this.weatherType = weatherType;
    }
    fill(weatherType, count) {
        this.setWeatherType(weatherType);
        this._periodAmount = count;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Report.prototype, "periodAmount", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Report.prototype, "weatherType", void 0);
Report = __decorate([
    typeorm_1.Entity()
], Report);
exports.default = Report;
