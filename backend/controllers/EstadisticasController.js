import { EstadisticasConnection } from "../database/EstadisticasConnection.js";

const conn = new EstadisticasConnection()

const EstadisticasController = {
    funGetEstadisticas: (req, res) => {
        conn.getEstadisticas(req.params.usuId)
            .then(estadisticas => {
                res.status(200).json({
                    status: 200,
                    message: "Estadísticas obtenidas correctamente",
                    estadisticas: estadisticas
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funPostEstadisticas: (req, res) => {
        conn.postEstadisticas(req.body.usuId)
            .then(estadisticas => {
                res.status(200).json({
                    status: 200,
                    message: "Estadísticas creadas correctamente",
                    estadisticas: estadisticas
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funSumarSudokuJugado: (req, res) => {
        conn.sumarSudokuJugado(req.params.usuId)
            .then(estadisticas => {
                res.status(200).json({
                    status: 200,
                    message: "Sudoku jugado sumado correctamente",
                    estadisticas: estadisticas
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    },

    funSumarSudokuGanados: (req, res) => {
        conn.sumarSudokuGanados(req.params.usuId)
            .then(estadisticas => {
                res.status(200).json({
                    status: 200,
                    message: "Sudoku ganado sumado correctamente",
                    estadisticas: estadisticas
                })
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    message: err.message
                })
            })
    }
}

export default EstadisticasController;