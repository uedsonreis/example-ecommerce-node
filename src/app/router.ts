import createRouter, { Request, Response, NextFunction } from 'express';
import * as core from "express-serve-static-core";

import httpCodes from './http.codes';
import SecurityGuard from './security.guard';
import UserController from '../controllers/user.controller';
import ProductController from '../controllers/product.controller';
import SalesOrderController from '../controllers/sales.order.controller';

class RouterBuilder {

    private readonly routes = createRouter();

    public verifyAuthentication(request: Request, response: Response, next: NextFunction): void {
        const token = request.headers.authorization;
    
        const payload: any = SecurityGuard.getInfoFromToken(token!);
    
        if (payload instanceof Error) {
            response.status(httpCodes.UNAUTHENTICATED).send("Usuário não está logado.");
        } else {
            request.body.userId = payload.userId;
            next();
        }
    }

    public getRoutes(): core.Router {

        this.routes.post('/user/login', UserController.login);
        this.routes.post('/user/customer/add', UserController.customer);
        this.routes.get('/product/list', ProductController.list);
        
        this.routes.get('/sales/order/list', this.verifyAuthentication, SalesOrderController.list);
        this.routes.post('/sales/order/invoice', this.verifyAuthentication, SalesOrderController.invoice);

        return this.routes;
    }
}

const router = new RouterBuilder();

export default router.getRoutes();