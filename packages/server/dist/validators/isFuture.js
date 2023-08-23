"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFuture = exports.IsFutureConstraint = void 0;
const class_validator_1 = require("class-validator");
let IsFutureConstraint = class IsFutureConstraint {
    validate(value) {
        const dateFromValue = new Date(value);
        return dateFromValue.getTime() > Date.now();
    }
    defaultMessage() {
        return "Date must be in the future";
    }
};
IsFutureConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], IsFutureConstraint);
exports.IsFutureConstraint = IsFutureConstraint;
function IsFuture(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsFutureConstraint
        });
    };
}
exports.IsFuture = IsFuture;
//# sourceMappingURL=isFuture.js.map