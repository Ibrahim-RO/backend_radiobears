import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'videoyoutube'
})

class VideoYoutube extends Model {
    @Column({
        type: DataType.STRING(80)
    })
    declare title: string

    @Column({
        type: DataType.STRING(200)
    })
    declare description: string

    @Column({
        type: DataType.STRING(150)
    })
    declare url: string

    @Column({
        type: DataType.STRING(150)
    })
    declare youtube_link: string

    @Column({
        type: DataType.STRING(20)
    })
    declare short: boolean
}

export default VideoYoutube