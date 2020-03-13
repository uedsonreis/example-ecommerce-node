import { Model } from 'sequelize/types';
import bcrypt from 'bcrypt';

import { User } from '../entities/user';
import dao from '../repositories/dao';
import tokenManager from '../app/token.manager';
import { Customer } from '../entities/customer';

class UserService {

    private userRepository = dao.getUserRepository();
    private customerRepository = dao.getCustomerRepository();

    public async getOneByLogin(login: string): Promise<User> {
        
        const result: Model<User> | null = await this.userRepository.findOne({
            where: { login }
        });

        return result as User;
    }

    public async login(user: User): Promise<string | null> {

        const result = await this.getOneByLogin(user.login);

        if (result === undefined || result === null) return null;

        const userDB: User = result as User;

        if (!bcrypt.compareSync(user.password, userDB.password)) return null;

        return this.generateToken(user);
    }

    public generateToken(user: User): string {
        return tokenManager.generateToken(user.login);
    }

    public async saveCustomer(customer: Customer): Promise<number | Error> {
        try {
            if (customer.email === undefined || customer.email === null) {
                return new Error("Email must be informed!");
            }
            if (customer.name === undefined || customer.name === null) {
                return new Error("Name must be informed!");
            }
            if (customer.age < 18) {
                return new Error("Customer must be an adult!");
            }
            if (customer.user.password === undefined || customer.user.password === null) {
                return new Error("Password must be input!");
            }

            let savedCustomer = await this.customerRepository.findOne({
                include: [ User ],
                where: { email: customer.email }
            }) as Customer;

            if (savedCustomer) {
                return new Error("Customer email is already registered!");
            }

            customer.user.login = customer.email;
            const id = await this.save(customer.user);
            console.log("#Customer1= ", customer);
            if (id instanceof Number) customer.user.id = Number(id);

            console.log("#Customer2= ", customer);
            savedCustomer = await this.customerRepository.create(customer) as Customer;

            return savedCustomer.id;

        } catch (error) {
            console.error(error);
            return error;
        }
    }

    public async save(user: User): Promise<number | Error> {
        try {
            if (!user.admin || user.admin === null) {
                user.admin = false;
            }
    
            user.password = bcrypt.hashSync(user.password, 13);
    
            const result = await this.userRepository.create(user) as User;
    
            user.id = result.id;
    
            return user.id;
            
        } catch (error) {
            console.error(error);
            return error as Error;
        }
    }
    
}

export default new UserService();