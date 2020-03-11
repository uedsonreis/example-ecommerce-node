"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import morgan from 'morgan';
// import xmlparser from 'express-xml-bodyparser';
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./router"));
class AppController {
    constructor() {
        this.express = express_1.default();
        this.middlewares();
        this.configRoutes();
    }
    middlewares() {
        // this.express.use(xmlparser());
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(body_parser_1.default.json());
        this.express.use(cors_1.default());
        // this.express.use(morgan('combined', { stream: { write: core.error.streamWrite } }));
        this.express.use(helmet_1.default());
    }
    configRoutes() {
        this.express.use('/api', router_1.default);
    }
}
exports.default = new AppController().express;
