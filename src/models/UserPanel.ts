import { Table, Column, DataType, Default, Model } from 'sequelize-typescript'

@Table({
    tableName: 'userpanel'
})

class UserPanel extends Model{
    @Column({
        type: DataType.STRING(100),
    })
    declare email: string

    @Column({
        type: DataType.STRING(100)
    })
    declare password: string
}

export default UserPanel