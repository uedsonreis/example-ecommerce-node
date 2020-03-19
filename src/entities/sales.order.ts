import { Model, Table, Column, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';

import { Item } from "./item";
import { Customer } from './customer';

@Table({ tableName: 'sales_order', timestamps: false })
export class SalesOrder extends Model<SalesOrder> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number;
    
    @Column({ field: 'total_value' })
    public totalValue!: number;

    @Column({ field: 'created_at' })
    public createdAt: Date = new Date();

    @BelongsTo(() => Customer, 'customerId')
    public customer!: Customer;

    @Column({ field: 'user_id' })
    @ForeignKey(() => Customer)
    public customerId!: number;

    @HasMany(() => Item)
    public items!: Item[];
}