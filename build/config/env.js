"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// dotenv.config({
//     path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
// });
dotenv_1.default.config();
exports.default = {
    // env: process.env.NODE_ENV,
    // local: process.env.NODE_ENV,
    portServer: process.env.PORT_SERVER,
    tokenSecret: process.env.TOKEN_SECRET,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        db: process.env.DB_DATABASE,
        instance: process.env.DB_INSTANCE,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
    }
    // , test: {
    //     storage: './__tests__/database.sqlite'
    // }
};
