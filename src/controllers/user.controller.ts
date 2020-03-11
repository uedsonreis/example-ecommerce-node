import { Request, Response } from 'express';

import UserService from '../services/user.service';

class UserController {

    public async login(req: Request, res: Response): Promise<Response> {
        console.log(req.body);

        return res.send('Vamos logar!');
    }

}

export default new UserController();