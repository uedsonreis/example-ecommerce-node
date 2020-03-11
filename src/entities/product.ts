import { Factory } from "./factory";

export class Product {

    public id!: number;
    
    public name!: string;
    public price!: number;
    public amount!: number;

    public factory!: Factory;
}