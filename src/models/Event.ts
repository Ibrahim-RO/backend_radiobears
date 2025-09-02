import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
    tableName: 'event'
})

class Events extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.STRING(200)
    })
    declare description: string

    @Column({
        type: DataType.STRING(300)
    })
    declare image: string

    @Column({
        type: DataType.DATEONLY
    })
    declare dateEvent: string
}

export default Events