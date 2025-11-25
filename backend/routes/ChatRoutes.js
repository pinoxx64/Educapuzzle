import { Router } from 'express'
import ChatController from '../controllers/ChatController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.get('/', [validJWT], ChatController.funGetMensajes)
router.post('/', [validJWT], ChatController.funPostMensaje)