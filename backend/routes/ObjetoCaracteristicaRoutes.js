import { Router } from 'express'
import ObjetoCaracteristicasController from '../controllers/ObjetoCaracteristicasController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.get('/objeto/:idObjeto', [validJWT], ObjetoCaracteristicasController.funGetPorObjeto)
router.get('/caracteristica/:idCaracteristica', [validJWT], ObjetoCaracteristicasController.funGetPorCaracteristica)
router.get('/:idObjeto/:idCaracteristica', [validJWT], ObjetoCaracteristicasController.funGetRelacion)
router.post('/', [validJWT], ObjetoCaracteristicasController.funPostRelacion)
router.delete('/:idObjeto/:idCaracteristica', [validJWT], ObjetoCaracteristicasController.funDeleteRelacion)