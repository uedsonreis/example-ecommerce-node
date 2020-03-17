import { Request, Response } from 'express';

import HTTP from '../app/http.codes';
import salesOrderService from '../services/sales.order.service';
import { SalesOrder } from '../entities/sales.order';
import { Item } from '../entities/item';

class SalesOrderController {

    public async list(request: Request, response: Response): Promise<Response> {
        try {
            const { userId } = request.body;

            const salesOrders: SalesOrder[] = await salesOrderService.getList({userId});
    
            return response.status(HTTP.OK).json(salesOrders);
            
        } catch (error) {
            return response.status(HTTP.BAD_REQUEST).json(error);
        }
    }

    public async invoice(request: Request, response: Response): Promise<Response> {
        try {
            const userId = request.body.userId;
            let cart = request.body as Item[];
            cart = cart.slice(0, cart.length);

            if (!cart || cart.length < 1) {
                return response.status(HTTP.NO_CONTENT);
            }
    
            const result = await salesOrderService.invoice(userId, cart);

            if (result instanceof Error) {
                return response.status(HTTP.BAD_REQUEST).json(result);
            }

            const salesOrder: SalesOrder = result;
    
            return response.status(HTTP.OK).json(salesOrder);
            
        } catch (error) {
            return response.status(HTTP.BAD_REQUEST).json(error);
        }
    }

}

export default new SalesOrderController();