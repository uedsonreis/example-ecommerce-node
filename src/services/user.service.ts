import { Model } from 'sequelize/types';

import { User } from '../entities/user';
import dao from '../repositories/dao';

class UserService {

    private userRepository = dao.getUserRepository();

    constructor() {
        this.userRepository.findAll().then((values: Model<User>[]) => {
            const users = values as User[];
            console.log('Users: ', users[0].login);
        });
    }
    
}

export default new UserService();