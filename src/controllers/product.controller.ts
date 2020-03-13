import { Request, Response } from 'express';

import HTTP from '../app/http.codes';
import productService from '../services/product.service';
import { Product } from '../entities/product';

class ProductController {

    public async list(request: Request, response: Response): Promise<Response> {
        try {
            const { filter } = request.body;
    
            const products: Product[] = await productService.getList(filter);
    
            return response.status(HTTP.OK).json(products);
            
        } catch (error) {
            return response.status(HTTP.BAD_REQUEST).json(error);
        }
    }

}

export default new ProductController();