import { Model, Table, Column, PrimaryKey, IsUUID, AutoIncrement } from "sequelize-typescript";

@Table({ tableName: 'user_entity', timestamps: false })
export class User extends Model<User> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number;

    @Column
    public login!: string;
    
    @Column
    public password!: string;
    
    @Column
    public admin!: boolean;
}