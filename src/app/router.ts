import createRouter, { Request, Response, NextFunction } from 'express';

import httpCodes from './http.codes';
import SecurityGuard from './security.guard';
import UserController from '../controllers/user.controller';
import ProductController from '../controllers/product.controller';
import SalesOrderController from '../controllers/sales.order.controller';

const router = createRouter();

const verifyAuth = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    const payload: any = SecurityGuard.getInfoFromToken(token!);

    if (payload instanceof Error) {
        response.status(httpCodes.UNAUTHENTICATED).json("Usuário não está logado.");
    }

    request.body.userId = payload.userId;

    next();
};

router.get('/teste', (request: Request, response: Response) => {
    response.send('Requisição (GET) de Teste ok!')
});

router.post('/user/login', UserController.login);
router.post('/user/customer/add', UserController.customer);
router.get('/product/list', ProductController.list);

router.get('/sales/order/list', verifyAuth, SalesOrderController.list);
router.post('/sales/order/invoice', verifyAuth, SalesOrderController.invoice);

export default router;