import { Model, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";

import { Factory } from "./factory";

@Table({ tableName: 'product', timestamps: false })
export class Product extends Model<Product> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number;
    
    @Column
    public name!: string;

    @Column
    public price!: number;

    @Column
    public amount!: number;

    @BelongsTo(() => Factory, 'factory_id')
    public factory!: Factory;

    @ForeignKey(() => Factory)
    public factoryId!: number;
}