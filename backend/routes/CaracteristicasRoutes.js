import { Router } from 'express'
import CaracteristicaController from '../controllers/CaracteristicaController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.get('/', [validJWT], CaracteristicaController.funGetCaracteristicas)
router.get('/:id', [validJWT], CaracteristicaController.funGetCaracteristica)
router.get('/categoria/:idCategoria', [validJWT], CaracteristicaController.funGetCaracteristicaPorIdCategoria)
router.post('/', [validJWT], CaracteristicaController.funPostCaracteristica)
router.put('/:id', [validJWT], CaracteristicaController.funPutCaracteristica)
router.delete('/:id', [validJWT], CaracteristicaController.funDeleteCaracteristica)