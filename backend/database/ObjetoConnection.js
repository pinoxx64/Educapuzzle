import { Objeto, Categoria, Caracteristicas, ObjetoCaracteristicas } from "../models/association.js";
import { Op, where } from 'sequelize'

class ObjetoConnection {
    getObjetos = async () => {
        let objetos = []
        objetos = await Objeto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        })

        if (!objetos) throw new Error("No hay objetos")

        objetos = objetos.map(obj => ({
            id: obj.id,
            nombre: obj.nombre,
            idCategoria: obj.idCategoria
        }))

        return objetos
    }
    
    getCaracteristicasPorObjeto = async (idObjeto) => {
        const objeto = await Objeto.findOne({ where: { id: idObjeto } })
        if (!objeto) throw new Error("No existe el objeto")

        const relaciones = await ObjetoCaracteristicas.findAll({
            where: { idObjetos: idObjeto }
        })
        if (!relaciones || relaciones.length === 0) return []

        const idsCaracteristicas = relaciones.map(r => r.idCaracteristica)
        const caracteristicas = await Caracteristicas.findAll({
            where: { id: idsCaracteristicas }
        })

        return caracteristicas.map(c => ({
            id: c.id,
            nombre: c.nombre,
            idCategoria: c.idCategoria
        }))
    }

    getObjeto = async (id) => {
        let objeto = await Objeto.findOne({
            where: { id },
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        })

        if (!objeto) throw new Error("No existe el objeto")

        return {
            id: objeto.id,
            nombre: objeto.nombre,
            idCategoria: objeto.idCategoria
        }
    }

    getObjetosPorCategoria = async (idCategoria) => {
        let objetos = []
        objetos = await Objeto.findAll({
            where: { idCategoria },
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        })

        if (!objetos) throw new Error("No hay objetos para esta categoria")

        return objetos.map(obj => ({
            id: obj.id,
            nombre: obj.nombre,
            idCategoria: obj.idCategoria
        }))
    }

    postObjeto = async (objeto) => {
        const { nombre, idCategoria } = objeto
        const newObjeto = await Objeto.create({
            nombre,
            idCategoria
        })

        if (!newObjeto) throw new Error("No se pudo crear el objeto")

        return {
            id: newObjeto.id,
            nombre: newObjeto.nombre,
            idCategoria: newObjeto.idCategoria
        }
    }

    putObjeto = async (id, objeto) => {
        await Objeto.update({
            nombre: objeto.nombre,
            idCategoria: objeto.idCategoria
        }, {
            where: { id }
        })

        const objetoActualizado = await Objeto.findOne({ where: { id } })
        if (!objetoActualizado) throw new Error("No se pudo actualizar el objeto")

        return {
            id: objetoActualizado.id,
            nombre: objetoActualizado.nombre,
            idCategoria: objetoActualizado.idCategoria
        }
    }

    deleteObjeto = async (id) => {
        const objetoEliminado = await Objeto.destroy({ where: { id } })
        if (!objetoEliminado) throw new Error("No se pudo eliminar el objeto")

        return 'Objeto eliminado correctamente'
    }
}

export { ObjetoConnection }