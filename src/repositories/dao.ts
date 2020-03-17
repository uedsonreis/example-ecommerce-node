import { Sequelize } from 'sequelize-typescript';
import { ModelCtor } from 'sequelize/types';

import env from '../app/env';
import { User } from '../entities/user';
import { Factory } from '../entities/factory';
import { Product } from '../entities/product';
import { Customer } from '../entities/customer';
import { SalesOrder } from '../entities/sales.order';
import { Item } from '../entities/item';

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
            User, Factory, Product, Customer, SalesOrder, Item
        ]);
    }

    public getUserRepository(): ModelCtor<User> {
        return User;
    }

    public getFactoryRepository(): ModelCtor<Factory> {
        return Factory;
    }

    public getProductRepository(): ModelCtor<Product> {
        return Product;
    }

    public getCustomerRepository(): ModelCtor<Customer> {
        return Customer;
    }

    public getSalesOrderRepository(): ModelCtor<SalesOrder> {
        return SalesOrder;
    }

    public getItemRepository(): ModelCtor<Item> {
        return Item;
    }

}

export default new DataAccessObject();