import { Sequelize } from 'sequelize-typescript';

import env from '../config/env';
import { User } from '../entities/user';
import { ModelCtor } from 'sequelize/types';

class DataAccessObject {

    private readonly sequelize: Sequelize;

    constructor() {

        this.sequelize = new Sequelize({
            database: env.database.db,
            host: env.database.host,
            username: env.database.user,
            password: env.database.pass,
            port: Number(env.database.port),
            dialectOptions: { instanceName: env.database.instance },
            dialect: env.database.dialect
        });

        this.sequelize.addModels([
            User
        ]);
    }

    public getUserRepository(): ModelCtor<User> {
        return User;
    }

}

export default new DataAccessObject();