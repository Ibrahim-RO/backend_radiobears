import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'host'
})

class Host extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.STRING(30)
    })
    declare age: string
    
    @Column({
        type: DataType.STRING(200)
    })
    declare description: string

    @Column({
        type: DataType.STRING(300)
    })
    declare image: string
}

export default Host