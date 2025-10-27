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
            correo: usuario.correo,
            puntuacion: usuario.puntuacion,
            deletedAt: usuario.deletedAt,
            roles: usuario.roles.map(rol => rol.rol.nombre)
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
            correo: user.correo,
            puntuacion: user.puntuacion,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.nombre)
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
            correo: user.correo,
            puntuacion: user.puntuacion,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.nombre)
        }

        return user
    }

    login = async (correo, contrasena) => {
        console.log("Dentro")
        console.log(correo, contrasena)

        const user = await Usuario.findOne({
            where: {
                correo: correo
            },
            include: [{
                model: UsuarioRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })
        console.log("Contraseña")
        console.log(user)

        if (!user) throw new Error("No existe el usuario")

        const correctPassword = await bycrypt.compare(contrasena, user.contrasena)
        console.log("correcta?")
        console.log(correctPassword)
        if (!correctPassword) throw new Error("Contraseña incorrecta")
        console.log(user)

        return {
            id: user.id,
            name: user.name,
            correo: user.correo,
            puntuacion: user.puntuacion,
            deletedAt: user.deletedAt,
            roles: user.roles.map(rol => rol.rol.nombre)
        }
    }

    postUser = async (body) => {
        const { name, correo, contrasena, puntuacion, roles } = body

        const user = await Usuario.create({
            name,
            correo,
            contrasena,
            puntuacion
        })

        if (roles && roles.length > 0) {
            for (const rolName of roles) {
                const rol = await Rol.findOne({ where: { nombre: rolName } });
                if (rol) {
                    await UsuarioRol.create({
                        idUsu: user.id,
                        idRol: rol.id,
                    });
                }
            }
        }

        const userCreado = await Usuario.findByPk(user.id, {
            include: [{
                model: UsuarioRol,
                as: 'roles',
                include: {
                    model: Rol,
                    as: 'rol'
                }
            }]
        })

        return {
            id: userCreado.id,
            name: userCreado.name,
            correo: userCreado.correo,
            puntuacion: userCreado.puntuacion,
            deletedAt: userCreado.deletedAt,
            roles: userCreado.roles.map(rol => rol.rol.nombre)
        }
    }

    putUser = async (id, body) => {
        console.log(body)
        await Usuario.update({
            name: body.name,
            correo: body.correo,
            puntuacion: body.puntuacion,
            contrasena: body.contrasena
    }, {
        where: { id }
    });

    if (body.roles && Array.isArray(body.roles)) {
        await UsuarioRol.destroy({ where: { idUsu: id } });

        for (const rolName of body.roles) {
            const rol = await Rol.findOne({ where: { nombre: rolName } });
            if (rol) {
                await UsuarioRol.create({
                    idUsu: id,
                    idRol: rol.id,
                });
            }
        }
    }

    const userActualizado = await Usuario.findByPk(id, {
        include: [{
            model: UsuarioRol,
            as: 'roles',
            include: {
                model: Rol,
                as: 'rol'
            }
        }]
    });

    console.log(userActualizado)
    if (!userActualizado) throw new Error('No se ha podido modificar el usuario.');

    return {
        id: userActualizado.id,
        name: userActualizado.name,
        correo: userActualizado.correo,
        puntuacion: userActualizado.puntuacion,
        deletedAt: userActualizado.deletedAt,
        roles: userActualizado.roles.map(rol => rol.rol.nombre)
    };
    }

    softDeleteUser = async (id) => {
        try {
            const user = await Usuario.findByPk(id, { paranoid: false });

            if (!user) {
                throw new Error(`No se ha encontrado el usuario con el ID proporcionado. (${id})`);
            }

            if (user.deletedAt) {
                throw new Error(`El usuario con ID ${id} ya está eliminado.`);
            }

            await user.destroy();

            return { message: `Usuario con ID ${id} ha sido marcado como eliminado (soft delete).` };
        } catch (error) {
            throw new Error(`Error al realizar el soft delete: ${error.message}`);
        }
    }

    reactivateUser = async (id) => {
        try {
            const user = await Usuario.findByPk(id, {
                paranoid: false,
            });

            if (!user) {
                throw new Error(`No se ha encontrado el usuario con el ID proporcionado. (${id})`);
            }

            if (user.deletedAt === null) {
                throw new Error(`El usuario con ID ${id} ya está activo.`);
            }

            await user.restore();

            return { message: `Usuario con ID ${id} ha sido reactivado exitosamente.` };
        } catch (error) {
            throw new Error(`Error al reactivar el usuario: ${error.message}`);
        }
    }
}

export { UsuarioConnection }