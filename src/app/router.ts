import createRouter, { Request, Response } from 'express';

import UserController from '../controllers/user.controller';

const router = createRouter();

router.get('/teste', (req: Request, res: Response) => {
    res.send('Requisição (GET) de Teste ok!')
});

router.post('/login', UserController.login);

export default router;