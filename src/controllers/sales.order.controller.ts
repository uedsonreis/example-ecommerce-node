import { Request, Response } from 'express';

import HTTP from '../app/http.codes';
import salesOrderService from '../services/sales.order.service';
import { SalesOrder } from '../entities/sales.order';
import { Item } from '../entities/item';

class SalesOrderController {

    public async list(request: Request, response: Response): Promise<void> {
        try {
            const { userId } = request.body;

            const result = await salesOrderService.getList(userId);

            if (result instanceof Error) {
                response.status(HTTP.BAD_REQUEST).send(result.message);
                return;
            }

            const salesOrders = result as SalesOrder[];

            if (!salesOrders || salesOrders.length < 1) {
                response.status(HTTP.NO_CONTENT);
            } else {
                response.status(HTTP.OK).json(salesOrders);
            }    
            
        } catch (error) {
            response.status(HTTP.BAD_REQUEST).send(error.message);
        }
    }

    public async invoice(request: Request, response: Response): Promise<void> {
        try {
            const userId = request.body.userId;
            let cart = request.body as Item[];
            cart = cart.slice(0, cart.length);

            if (!cart || cart.length < 1) {
                response.status(HTTP.NO_CONTENT);
                return;
            }
    
            const result = await salesOrderService.invoice(userId, cart);

            if (result instanceof Error) {
                response.status(HTTP.BAD_REQUEST).send(result.message);
                return;
            }
    
            response.status(HTTP.OK).json(result);
            
        } catch (error) {
            response.status(HTTP.BAD_REQUEST).send(error.message);
        }
    }

}

export default new SalesOrderController();