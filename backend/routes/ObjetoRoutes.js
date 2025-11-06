import { Router } from 'express'
import ObjetoController from '../controllers/ObjetoController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.get('/', [validJWT], ObjetoController.funGetObjetos)
router.get('/:id', [validJWT], ObjetoController.funGetObjeto)
router.get('/categoria/:idCategoria', [validJWT], ObjetoController.funGetObjetoPorIdCategoria)
router.post('/', [validJWT], ObjetoController.funPostObjeto)
router.put('/:id', [validJWT], ObjetoController.funPutObjeto)
router.delete('/:id', [validJWT], ObjetoController.funDeleteObjeto)