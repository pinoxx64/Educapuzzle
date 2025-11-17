import { CategoriaConnection } from "../database/CategoriaConnection.js";

const conn = new CategoriaConnection()

const CategoriaController = {
    funGetCategorias: (req, res) => {
        conn.getCategorias()
            .then(categorias => {
                res.status(200).json({
                    status: 200,
                    message: "Usuarios obtenidos correctamente",
                    categorias: categorias
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funGetCategoria: (req, res) => {
        conn.getCategoria(req.params.id)
            .then(categoria => {
                res.status(200).json({
                    status: 200,
                    message: "Categoria obtenido correctamente",
                    categoria: categoria
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funGetPuzzles: (req, res) => {
        conn.getPuzzles(req.params.id)
            .then(puzzle => {
                res.status(200).json({
                    status: 200,
                    message: "puzzle obtenido correctamente",
                    puzzle: puzzle
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funPostCategoria: (req, res) => {
        conn.postCategoria(req.body)
            .then(categoria => {
                res.status(200).json({
                    status: 200,
                    message: "Categoria creado correctamente",
                    categoria: categoria
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funPutCategoria: (req, res) => {
        conn.putCategoria(req.params.id, req.body)
            .then(categoria => {
                res.status(200).json({
                    status: 200,
                    message: "Categoria actualizado correctamente",
                    categoria: categoria
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
    funDeleteCategoria: (req, res) => {
        conn.deleteCategoria(req.params.id)
            .then(Categoria => {
                res.status(200).json({
                    status: 200,
                    message: "Categoria eliminado correctamente",
                    Categoria: Categoria
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funComprobarSiEsFuncional: (req, res) => {
        conn.comprobarSiEsFuncional(req.params.id)
            .then(Categoria => {
                res.status(200).json({
                    status: 200,
                    message: "Categoria funciona correctamente",
                    Categoria: Categoria
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funCrearSudoku: (req, res) => {
        conn.crearSudoku(req.params.id)
            .then(Categoria => {
                res.status(200).json({
                    status: 200,
                    message: "Sudoku creado correctamente",
                    Categoria: Categoria
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funResolucionSudoku: (req, res) => {
        conn.verResolucionSudoku(req.params.id)
            .then(Categoria => {
                res.status(200).json({
                    status: 200,
                    message: "Resolucion funciona correctamente",
                    Categoria: Categoria
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },
}

export default CategoriaController