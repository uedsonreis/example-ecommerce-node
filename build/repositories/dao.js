"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const env_1 = __importDefault(require("../config/env"));
const user_1 = require("../entities/user");
class DataAccessObject {
    constructor() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            database: env_1.default.database.db,
            host: env_1.default.database.host,
            username: env_1.default.database.user,
            password: env_1.default.database.pass,
            port: Number(env_1.default.database.port),
            dialectOptions: { instanceName: env_1.default.database.instance },
            dialect: env_1.default.database.dialect
        });
        this.sequelize.addModels([
            user_1.User
        ]);
    }
    getUserRepository() {
        return user_1.User;
    }
}
exports.default = new DataAccessObject();
