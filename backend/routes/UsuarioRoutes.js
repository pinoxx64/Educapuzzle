import { Router } from 'express'
import UsuarioController from '../controllers/UsuarioController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.post('/login', UsuarioController.funLogin)

router.get('/',[validJWT] ,UsuarioController.funGetUsers)
router.get('/:id',[validJWT], UsuarioController.funGetUser)
router.get('/buscar/correo',[validJWT], UsuarioController.funGetUserByCorreo)
router.post('/', UsuarioController.funPostUser)
router.put('/:id',[validJWT], UsuarioController.funPutUser)
router.delete('/:id',[validJWT], UsuarioController.funDeleteUser)
router.get('/activate/:id',[validJWT], UsuarioController.funActivateUser)