import { User } from "./user";

export class Customer {

    public id!: number;

    public name!: string;
    public email!: string;
    public age!: number;
    public address!: string;

    public user!: User;
}