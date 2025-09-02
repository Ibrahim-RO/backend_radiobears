import { Sequelize } from 'sequelize-typescript'
import colors from 'colors'

const db = new Sequelize(process.env.DATABASE_URL, {
    models: [__dirname + "/../models/**/*"]
})

export const connectDB = async () => {
    try {
        db.authenticate();
        db.sync({ alter: true });
        console.log(colors.blue("Conexión exitosa a la BD"))
    } catch (error) {
        console.log(colors.red.bold("Hubo un error al conectar con la BD"))
    }
}
