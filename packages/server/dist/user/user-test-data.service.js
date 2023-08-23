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
exports.UserTestDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_1 = require("./user");
const typeorm_2 = require("typeorm");
const builder_pattern_1 = require("builder-pattern");
let UserTestDataService = class UserTestDataService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.insertTestUsers().catch(e => console.error(e));
    }
    async insertTestUsers() {
        await this.userRepository.insert(builder_pattern_1.Builder()
            .firstName("Max")
            .lastName("Power")
            .email("max@pow.er")
            .birthday(new Date(1980, 12, 12))
            .build());
        await this.userRepository.insert(builder_pattern_1.Builder()
            .firstName("James")
            .lastName("Bond")
            .email("james@bo.nd")
            .birthday(new Date(1985, 12, 12))
            .build());
    }
};
UserTestDataService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserTestDataService);
exports.UserTestDataService = UserTestDataService;
//# sourceMappingURL=user-test-data.service.js.map