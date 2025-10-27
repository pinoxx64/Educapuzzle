const bycrypt = require('bcrypt')
const { fakerES } = require('@faker-js/faker')

const usuarios = async () => {
    const users = []
    for (let i = 0; i < 10; i++) {
        const password = await bycrypt.hash('password', 10)
        if (i == 0){
            users.push({
                name: fakerES.person.firstName(),
                correo: fakerES.internet.email(),
                contrasena: password,
                puntuacion: 0,
                roles: ['Administrador']
            });
        }else if (i == 1){
            users.push({
                name: fakerES.person.firstName(),
                correo: fakerES.internet.email(),
                contrasena: password,
                puntuacion: 0,
                roles: ['Profesor']
            });
        }else{
            users.push({
                name: fakerES.person.firstName(),
                correo: fakerES.internet.email(),
                contrasena: password,
                puntuacion: 0,
                roles: ['Alumno']
            });
        }
    }

    return users
}

module.exports = {
    usuarios
}