"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./config/env"));
const dao_1 = __importDefault(require("./repositories/dao"));
const portServer = env_1.default.portServer || "3000";
const app = express_1.default();
app.listen(portServer, () => console.log("App rodando na porta 3000!"));
dao_1.default.getUserRepository().findAll().then((values) => {
    const users = values;
    console.log("Users: ", users[0].login);
});
