import { Request, Response } from 'express';

import HTTP from '../app/http.codes';
import userService from '../services/user.service';
import { User } from '../entities/user';
import { Customer } from '../entities/customer';

class UserController {

    public async login(request: Request, response: Response): Promise<Response> {
        try {
            const { login, password } = request.body;
    
            const user = { login, password } as User;

            const token: string | null = await userService.login(user);
    
            if (token) {
                return response.status(HTTP.OK).json(token);
            } else {
                return response.status(HTTP.UNAUTHENTICATED).send("Username or password is invalid!");
            }
            
        } catch (error) {
            return response.status(HTTP.BAD_REQUEST).json(error);
        }
    }

    public async customer(request: Request, response: Response): Promise<Response> {
        try {
            const customer = request.body as Customer;
            console.log("@user.controller => customer = ", customer);

            let result = await userService.saveCustomer(customer);

            if (result instanceof Number) {
                const token: string | null = await userService.login(customer.user);
    
                if (token) {
                    return response.status(HTTP.OK).json(token);
                } else {
                    return response.status(HTTP.UNAUTHENTICATED).send("Username or password is invalid!");
                }
                
            } else {
                return response.status(HTTP.BAD_REQUEST).json(result);
            }
        } catch (error) {
            return response.status(HTTP.BAD_REQUEST).json(error);
        }
    }

}

export default new UserController();