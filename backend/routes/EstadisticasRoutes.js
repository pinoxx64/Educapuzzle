import { Router } from 'express'
import EstadisticasController from '../controllers/EstadisticasController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.get('/:usuId', [validJWT], EstadisticasController.funGetEstadisticas)
router.post('/', [validJWT], EstadisticasController.funPostEstadisticas)
router.update('/sumarSudokuJugados/:usuId', [validJWT], EstadisticasController.funSumarSudokuJugado)
router.update('/sumarSudokuGanados/:usuId', [validJWT], EstadisticasController.funSumarSudokuGanados)