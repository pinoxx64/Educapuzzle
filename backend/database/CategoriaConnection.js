import { Categoria, Usuario, Puzzle, Objeto, Caracteristicas, ObjetoCaracteristicas } from "../models/association.js";
import { Op, where } from 'sequelize'

class CategoriaConnection {
    getCategorias = async () => {
        let categorias = []
        categorias = await Categoria.findAll({
            include: [{
                model: Puzzle,
                as: 'puzzle'
            }, {
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

    getCategoria = async (id) => {
        let categorias = []
        categorias = await Categoria.findOne({
            include: [{
                model: Puzzle,
                as: 'puzzle'
            }, {
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

    getPuzzles = async () => {
        let puzzles = []
        puzzles = await Puzzle.findAll()

        if (!puzzles) throw new Error("No hay puzzles")
        puzzles = puzzles.map(puzzle => ({
            id: puzzle.id,
            nombre: puzzle.nombre
        }))

        return puzzles
    }

    postCategoria = async (categoria) => {
        const { nombre, idCreador, idPuzzle } = categoria
        const newCategoria = await Categoria.create({
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

    putCategoria = async (id, categoria) => {
        await Categoria.update({
            nombre: categoria.nombre
        }, {
            where: { id }
        })

        const categoriaActualizada = await Categoria.findOne({ where: { id } })
        if (!categoriaActualizada) throw new Error("No se pudo actualizar la categoria")

        return categoriaActualizada
    }

    deleteCategoria = async (id) => {
        const categoriaEliminada = await Categoria.destroy({ where: { id } })
        if (!categoriaEliminada) throw new Error("No se pudo eliminar la categoria")

        return 'Categoria eliminada correctamente'
    }

    comprobarSiEsFuncional = async (id) => {
        const categoria = await Categoria.findOne({
            where: { id },
            include: [
                {
                    model: Objeto,
                    as: 'objetos',
                    include: [{
                        model: ObjetoCaracteristicas,
                        as: 'objetoCaracteristicas'
                    }],
                },
                {
                    model: Caracteristicas,
                    as: 'caracteristicas'
                }
            ]
        });

        if (!categoria) throw new Error("No existe la categoría");

        const objetos = categoria.objetos
        const caracteristicas = categoria.caracteristicas

        console.log(objetos.length);
        console.log(caracteristicas.length);

        if (objetos.length < 9 || caracteristicas.length < 6) throw new Error("Se necesitan al menos 9 objetos y 6 caracteristicas");

        const caracArray = caracteristicas.map(c => Number(c.id));
        console.log(caracArray);

        const caracCont = Array(caracArray.length).fill(0);
        console.log(caracCont);

        objetos.forEach(obj => {
            const intermedias = obj.objetoCaracteristicas

            intermedias.forEach(oc => {
                const idCar = Number(oc.idCaracteristica);
                for (let i = 0; i < caracArray.length; i++) {
                    if (idCar === caracArray[i]) {
                        caracCont[i]++;
                    }
                }
            });
        });

        let contC = 0;
        for (let i = 0; i < caracCont.length; i++) {
            if (caracCont[i] >= 3) {
                contC++;
            }
        }

        if (contC < 6) throw new Error("Los caracteristicas no cubren a los suficientes objetos");
        return "Se pueden generar Sudokus";
    };

    crearSudoku = async (id) => {
        let caracC = []
        let caracF = []
        let obj = []
        const categoria = await Categoria.findOne({
            where: { id },
            include: [
                {
                    model: Objeto,
                    as: 'objetos',
                    include: [{
                        model: ObjetoCaracteristicas,
                        as: 'objetoCaracteristicas'
                    }],
                },
                {
                    model: Caracteristicas,
                    as: 'caracteristicas'
                }
            ]
        });
        let sudoku = [caracC,caracF,obj]
        return sudoku
    }
}

export { CategoriaConnection }