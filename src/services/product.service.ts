
import { WhereOptions } from 'sequelize/types';

import dao from '../repositories/dao';
import { Product } from '../entities/product';
import { Factory } from '../entities/factory';

class ProductService {

    private productRepository = dao.getProductRepository();

    public async getList(filter?: any): Promise<Product[]> {
        let where: WhereOptions | undefined = undefined;

        if (filter) where = { ...filter };

        const products = await this.productRepository.findAll({
            include: [ Factory ], where
        });

        return products as Product[];
    }

}

export default new ProductService();