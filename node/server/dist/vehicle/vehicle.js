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
const class_validator_1 = require("class-validator");
const isFuture_1 = require("../validators/isFuture");
let Vehicle = class Vehicle {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Vehicle.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "licensePlate", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Vehicle.prototype, "vin", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Vehicle.prototype, "model", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "active", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Vehicle.prototype, "color", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    isFuture_1.IsFuture(),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Vehicle.prototype, "validTill", void 0);
Vehicle = __decorate([
    typeorm_1.Entity({
        name: "vehicles"
    })
], Vehicle);
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.js.map