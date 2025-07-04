import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import Message from './Message'

type IUser = {
    username: string
    password: string
}

@Table({
    tableName: "users"
})

class User extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare username: string

    @Column({
        type: DataType.STRING(100)
    })
    declare password: string

    @HasMany(() => Message)
    declare messages: Message[]
}

export default User