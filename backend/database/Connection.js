import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

let db

if (!db) {
    db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_URL,
        dialect: process.env.DB_DIALECT,
        pool: {
            max: parseInt(process.env.DB_MAXCONNECTIONS),
            min: 1,
            acquire: 30000,
            idle: 10000
        },
        logging: console.log
    })
    console.log('Conexion establecida correctamente')
}

process.on('SIGINT', async() => {
    try {
        await db.close().then(() => {
            console.log('Conexiones cerradas correctamente')
            process.exit(0)
        })
            .catch(err => {
                console.error('Ha ocurido un error intentando cerrar la conexion: ', err)
                process.exit(1)
            })
    }catch (error) {
        console.error('La conexion no ha podido cerrarse: ', error)
    }
})

export default db