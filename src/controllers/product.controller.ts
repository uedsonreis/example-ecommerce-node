import { Request, Response } from 'express';

import HTTP from '../app/http.codes';
import productService from '../services/product.service';
import { Product } from '../entities/product';

class ProductController {

    public async list(request: Request, response: Response): Promise<void> {
        try {
            const { filter } = request.body;
    
            const products: Product[] = await productService.getList(filter);
    
            response.status(HTTP.OK).json(products);
            
        } catch (error) {
            response.status(HTTP.BAD_REQUEST).send(error.message);
        }
    }

}

export default new ProductController();