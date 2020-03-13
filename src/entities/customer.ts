import { Model, Table, Column, BelongsTo, ForeignKey } from "sequelize-typescript";

import { User } from "./user";

@Table({ tableName: 'customer', timestamps: false })
export class Customer extends Model<Customer> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number;

    @Column
    public name!: string;
    
    @Column
    public email!: string;
    
    @Column
    public age!: number;
    
    @Column
    public address!: string;

    @BelongsTo(() => User, 'user_id')
    public user!: User;

    @ForeignKey(() => User)
    public userId!: number;
}