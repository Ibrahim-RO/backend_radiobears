// src/models/News.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "news",
    timestamps: true,
})
class News extends Model {
    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare content: string;

    @Column({
        type: DataType.STRING(300),
        allowNull: true,
    })
    declare image: string | null;
}

export default News;
