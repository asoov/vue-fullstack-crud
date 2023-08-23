"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const process = require("process");
const common_1 = require("@nestjs/common");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(".database.sqlite3");
db.serialize(async () => {
    db.run("DROP TABLE IF EXISTS users");
    db.run(`CREATE TABLE users (
                    id INT PRIMARY KEY, 
                    firstName TEXT, 
                    lastName TEXT, 
                    email TEXT, 
                    birthday TEXT)
                `);
    db.run("DROP TABLE IF EXISTS vehicles");
    db.run(`CREATE TABLE vehicles (
                    id INT PRIMARY KEY, 
                    licensePlate TEXT,
                    vin TEXT,
                    model TEXT,
                    active INTEGER, 
                    color TEXT, 
                    validTill TEXT)
                `);
});
db.close(async () => {
    const app = (await core_1.NestFactory.create(app_module_1.AppModule)).setGlobalPrefix("api/v1");
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Users and Vehicles")
        .setDescription("API for managing users and vehicles")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("swagger-ui.html", app, document);
    if (process.env.NODE_ENV === "development") {
        app.enableCors();
    }
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8080);
});
//# sourceMappingURL=main.js.map