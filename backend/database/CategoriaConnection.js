import {Caregoria, Usuario, Puzzle} from "../models/association.js";
import { Op, where } from 'sequelize'

class CategoriaConnection {
    getCategorias = async() => {
        let categorias = []
        categorias = await Caregoria.findAll({
            include: [{
                model: Puzzle,
                as: 'puzzle'
            },{
                model: Usuario,
                as: 'usuarios'
            }]
        })

        if (!categorias) throw new Error("No hay categorias")

        categorias = categorias.map(categoria => ({
            id: categoria.id,
            nombre: categoria.nombre,
            idCreador: categoria.idCreador,
            idPuzzle: categoria.idPuzzle
        }))

        return categorias
    }

    getCategoria = async(id) => {
        let categorias = []
        categorias = await Caregoria.findOne({
            include: [{
                model: Puzzle,
                as: 'puzzle'
            },{
                model: Usuario,
                as: 'usuarios'
            }]
        })

        if (!categorias) throw new Error("No existe el usuario")

        categorias = {
            id: categorias.id,
            nombre: categorias.nombre,
            idCreador: categorias.idCreador,
            idPuzzle: categorias.idPuzzle
        }

        return categorias
    }

    getPuzzles = async() => {
        let puzzles = []
        puzzles = await Puzzle.findAll()

        if (!puzzles) throw new Error("No hay puzzles")
        puzzles = puzzles.map(puzzle => ({
            id: puzzle.id,
            nombre: puzzle.nombre
        }))

        return puzzles
    }

    postCategoria = async(categoria) => {
        const {nombre, idCreador, idPuzzle} = categoria
        const newCategoria = await Caregoria.create({
            nombre,
            idCreador,
            idPuzzle
        })

        const categoriaCreada = {
            id: newCategoria.id,
            nombre: newCategoria.nombre,
            idCreador: newCategoria.idCreador,
            idPuzzle: newCategoria.idPuzzle
        }

        return categoriaCreada
    }

    putCategoria = async(id, categoria) => {
        await Caregoria.update({
            nombre: categoria.nombre
        },{
            where: { id }
        })

        const categoriaActualizada = await Caregoria.findOne({ where: { id } })
        if (!categoriaActualizada) throw new Error("No se pudo actualizar la categoria")

        return categoriaActualizada
    }   

    deleteCategoria = async(id) => {
        const categoriaEliminada = await Caregoria.destroy({ where: { id } })
        if (!categoriaEliminada) throw new Error("No se pudo eliminar la categoria")

        return 'Categoria eliminada correctamente'
    } 
}

export {CategoriaConnection}