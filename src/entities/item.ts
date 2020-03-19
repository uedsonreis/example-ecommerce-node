import { Model, Table, Column, BelongsTo, ForeignKey } from 'sequelize-typescript';

import { Product } from "./product";
import { SalesOrder } from "./sales.order";

@Table({ tableName: 'item', timestamps: false })
export class Item extends Model<Item> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number;

    @Column
    public price!: number;
    
    @Column
    public amount!: number;

    @BelongsTo(() => Product, 'productId')
    public product!: Product;

    @Column({ field: 'product_id' })
    @ForeignKey(() => Product)
    public productId!: number;
    
    @BelongsTo(() => SalesOrder, 'salesOrderId')
    public salesOrder!: SalesOrder;

    @Column({ field: 'sales_order_id' })
    @ForeignKey(() => SalesOrder)
    public salesOrderId!: number;
}