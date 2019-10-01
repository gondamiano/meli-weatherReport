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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const weatherTypes_1 = __importDefault(require("./weatherTypes"));
const typeorm_1 = require("typeorm");
let WeatherReport = class WeatherReport {
    constructor() {
        this.day = 0;
        this.maximumRain = false;
        this.perimeter = 0;
        this.updated_date = new Date();
    }
    setWeatherType(weatherType) {
        this.weatherType = weatherType;
    }
    setWeatherTypeAndPerimeter(weatherType, perimeter) {
        this.weatherType = weatherType;
        this.perimeter = perimeter;
    }
    setHeavyRain() {
        this.setWeatherType(weatherTypes_1.default.HEAVYRAIN);
        this.maximumRain = true;
    }
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], WeatherReport.prototype, "day", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WeatherReport.prototype, "weatherType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], WeatherReport.prototype, "maximumRain", void 0);
__decorate([
    typeorm_1.Column('double'),
    __metadata("design:type", Number)
], WeatherReport.prototype, "perimeter", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], WeatherReport.prototype, "updated_date", void 0);
WeatherReport = __decorate([
    typeorm_1.Entity()
], WeatherReport);
exports.default = WeatherReport;
