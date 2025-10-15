import {Usuario, Rol, UsuarioRol} from '../models/association.js'
import bycrypt from 'bcrypt'
import { Op, where } from 'sequelize'

class UsuarioConnection {
    getUsers = async () => {
                let users = []

        users = await Usuario.findAll({
            paranoid: false,
            include: [{
                model: UsuarioRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        if (!users) throw new Error("No hay usuarios")

        users = users.map(usuario => ({
            id: usuario.id,
            name: usuario.name,
            correo: usuario.correio,
            puntuacion: usuario.image,
            deletedAt: usuario.deletedAt,
            roles: usuario.roles.map(rol => rol.rol.name)
        }))

        return users
    }

    getUserById = async (id) => {
        let user = []
        user = await Usuario.findOne({
            where: { id },
            include: [{
                model: UsuarioRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        if (!user) throw new Error("No existe el usuario")

        user = {
            id: user.id,
            name: user.name,
            correo: user.correio,
            puntuacion: user.image,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.name)
        }

        return user
    }

    getUserByEmail = async (correo) => {
        let user = []

        user = await Usuario.findOne({
            where: {
                correo: correo
            },
            include: [{
                model: UserRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        if (!user) throw new Error("No existe el usuario")

        user = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.name)
        }

        return user
    }

    login = async (correo, contrasena) => {}

    postUser = async (body) => {}

    putUser = async (id, body) => {}

    softDeleteUser = async (id) => {}

    reactivateUser = async (id) => {}
}