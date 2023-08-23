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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleTestDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vehicle_1 = require("./vehicle");
const typeorm_2 = require("typeorm");
const builder_pattern_1 = require("builder-pattern");
let VehicleTestDataService = class VehicleTestDataService {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
        this.insertTestVehicles().catch(e => console.error(e));
    }
    async insertTestVehicles() {
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await this.vehicleRepository.insert(builder_pattern_1.Builder()
            .licensePlate("IN-1234")
            .model("S4")
            .color("red")
            .active(true)
            .vin("8765-4321")
            .validTill(tomorrow)
            .build());
        await this.vehicleRepository.insert(builder_pattern_1.Builder()
            .licensePlate("IN-5678")
            .model("Q3")
            .color("black")
            .active(true)
            .vin("1234-4321")
            .validTill(tomorrow)
            .build());
    }
};
VehicleTestDataService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(vehicle_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehicleTestDataService);
exports.VehicleTestDataService = VehicleTestDataService;
//# sourceMappingURL=vehicle-test-data.service.js.map