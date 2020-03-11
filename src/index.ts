import express, { Request, Response } from "express";
import { Model } from "sequelize/types";

import env from './config/env';
import dao from './repositories/dao';
import { User } from "./entities/user";

const portServer = env.portServer;

const app = express();

app.listen(portServer, () => console.log("App rodando na porta %s!", portServer));

dao.getUserRepository().findAll().then((values: Model<User>[]) => {
    const users = values as User[];
    console.log("Users: ", users[0].login);
});