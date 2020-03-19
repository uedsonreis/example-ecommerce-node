import dao from '../repositories/dao';
import { WhereOptions, Includeable } from 'sequelize/types';

import { Item } from '../entities/item';
import { SalesOrder } from '../entities/sales.order';
import { Customer } from '../entities/customer';
import { Product } from '../entities/product';
import { Factory } from '../entities/factory';

class SalesOrderService {

    private salesOrderRepository = dao.getSalesOrderRepository();
    private customerRepository = dao.getCustomerRepository();
    private productRepository = dao.getProductRepository();
    private itemRepository = dao.getItemRepository();

    private include: Includeable[] = [
        Customer,
        { model: Item, as: 'items', include: [ 
            { model: Product, as: 'product', include: [ Factory ] }
        ]}
    ];

    public async invoice(userId: number, cart: Item[]): Promise<SalesOrder | Error> {
        let customer: Customer;
        try {
            const result: any = await this.customerRepository.findOne({ where: { userId } });
            customer = result.dataValues as Customer;
        } catch (error) {
            console.error(error);
            return new Error("Customer doesn't exists.");
        }

        try {
            let salesOrder = { customer: customer, customerId: customer.id } as SalesOrder;
            
            let result: any = await this.salesOrderRepository.create(salesOrder);
            salesOrder = result.dataValues as SalesOrder;

            for (const item of cart) {
                const productDB: any = await this.productRepository.findByPk(item.product.id);
                const product = productDB.dataValues as Product;

                if (product == null) {
                    return new Error("Product Id doesn't exists.");
                }
                
                if (product.amount < item.amount) {
                    return new Error("Product "+ product.name +" doesn't have enough amount.");
                }
                
                product.amount = product.amount - item.amount;
                salesOrder.totalValue += item.price * item.amount;
                
                item.product = product;
                item.productId = product.id;
                item.salesOrderId = salesOrder.id;
                await this.itemRepository.create(item);
            }

            salesOrder.items = cart;

            await this.salesOrderRepository.update(salesOrder, {
                where: { id: salesOrder.id },
                fields: [ "totalValue" ]
            });
            
            return salesOrder;
            
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async getList(userId: number, filter?: any): Promise<SalesOrder[] | Error> {
        try {
            let result: any = await this.customerRepository.findOne({ where: { userId } });
            const customer = result.dataValues as Customer;

            if (!customer) {
                return new Error("You must log as Customer.");
            }

            let where: WhereOptions = { customerId: customer.id, ...filter };
    
            result = await this.salesOrderRepository.findAll({
                include: this.include, where
            });
    
            return result as SalesOrder[];
            
        } catch (error) {
            console.error(error);
            return error;
        }
    }

}

export default new SalesOrderService();