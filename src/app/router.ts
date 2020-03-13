import createRouter, { Request, Response } from 'express';

import UserController from '../controllers/user.controller';
import ProductController from '../controllers/product.controller';

const router = createRouter();

router.get('/teste', (request: Request, response: Response) => {
    response.send('Requisição (GET) de Teste ok!')
});

router.post('/user/login', UserController.login);
router.post('/user/customer/add', UserController.customer);

router.get('/product/list', ProductController.list);

export default router;