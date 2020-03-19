import { Request, Response } from 'express';

import HTTP from '../app/http.codes';
import userService from '../services/user.service';
import { User } from '../entities/user';
import { Customer } from '../entities/customer';

class UserController {

    public async login(request: Request, response: Response): Promise<void> {
        try {
            const { login, password } = request.body;
    
            const user = { login, password } as User;

            const token: string | null = await userService.login(user);
    
            if (token) {
                response.status(HTTP.OK).json(token);
            } else {
                response.status(HTTP.UNAUTHENTICATED).send("Username or password is invalid!");
            }
            
        } catch (error) {
            response.status(HTTP.BAD_REQUEST).send(error.message);
        }
    }

    public async customer(request: Request, response: Response): Promise<void> {
        try {
            const customer = request.body as Customer;
            const { email } = customer;
            const { password } = customer.user;

            let result = await userService.saveCustomer(customer);

            if (result instanceof Error) {
                response.status(HTTP.BAD_REQUEST).send(result.message);
            } else {
                const token: string | null = await userService.login({ login: email, password } as User);
    
                if (token !== null) {
                    response.status(HTTP.OK).json(token);
                } else {
                    response.status(HTTP.UNAUTHENTICATED).send("Username or password is invalid!");
                }
            }
        } catch (error) {
            response.status(HTTP.BAD_REQUEST).send(error.message);
        }
    }

}

export default new UserController();