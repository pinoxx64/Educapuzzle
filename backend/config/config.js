import dotenv from 'dotenv'

dotenv.config()

export default {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_URL,
        dialect: process.env.DB_DIALECT
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_URL,
        dialect: process.env.DB_DIALECT
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_URL,
        dialect: process.env.DB_DIALECT
    }
}