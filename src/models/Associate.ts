import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'associate'
})

class Associate extends Model {
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string

    @Column({
        type: DataType.STRING(150)
    })
    declare image: string
}

export default Associate