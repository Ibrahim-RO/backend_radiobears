import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import User from './User'

@Table({
  tableName: "messages",
  timestamps: true, // createdAt y updatedAt automáticos
  updatedAt: false, // solo usamos createdAt
})

class Message extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare content: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}

export default Message
