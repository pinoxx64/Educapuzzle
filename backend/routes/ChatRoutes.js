import { Router } from 'express'
import ChatController from '../controllers/ChatController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.get('/chats/:id', [validJWT], ChatController.funGetMensajes)
router.post('/', [validJWT], ChatController.funPostMensaje)
router.post('/tema', [validJWT], ChatController.funPostTema)
router.get('/nombre', [validJWT], ChatController.funGetNombreTemas)