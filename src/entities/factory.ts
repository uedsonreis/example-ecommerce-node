import { Model, Table, Column } from "sequelize-typescript";

@Table({ tableName: 'factory', timestamps: false })
export class Factory extends Model<Factory> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number;

    @Column
    public name!: string;
}