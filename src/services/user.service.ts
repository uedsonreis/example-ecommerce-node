import { Model } from 'sequelize/types';
import bcrypt from 'bcrypt';

import { User } from '../entities/user';
import dao from '../repositories/dao';
import securityGuard from '../app/security.guard';
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

        const result: any = await this.getOneByLogin(user.login);

        if (result === undefined || result === null) return null;

        const userDB: User = result.dataValues as User;

        if (!bcrypt.compareSync(user.password, userDB.password)) return null;

        return securityGuard.generateToken(userDB);
    }

    public async saveCustomer(customer: Customer): Promise<Customer | Error> {
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
            const savedUser = await this.save(customer.user);
            if (savedUser instanceof Error) return savedUser;

            customer.userId = savedUser.id;
            customer.user = savedUser!;

            const saved: any = await this.customerRepository.create({ ...customer });

            return saved.dataValues as Customer;

        } catch (error) {
            console.error(error);
            return error;
        }
    }

    private async save(user: User): Promise<User> {
        if (!user.admin || user.admin === null) {
            user.admin = false;
        }

        user.password = bcrypt.hashSync(user.password, 13);

        const result: any = await this.userRepository.create({ ...user });

        return result.dataValues as User;
    }

    public async saveUser(user: User): Promise<number | Error> {
        try {
            const saved = await this.save(user);
            return saved.id;

        } catch (error) {
            console.error(error);
            return error as Error;
        }
    }
    
}

export default new UserService();