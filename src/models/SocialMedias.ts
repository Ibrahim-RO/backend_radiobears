import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

export type ISocialMedias = {
    name: string
    url: string
}

@Table({
    tableName: 'socialmedias'
})

class SocialMedias extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.STRING(150)
    })
    declare url: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    declare isActive: boolean
}

export default SocialMedias