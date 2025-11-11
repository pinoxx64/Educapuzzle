import { Router } from 'express'
import CategoriaController from '../controllers/CategoriaController.js'
import { validJWT } from '../middleware/validarJWT.js'

export const router = Router()

router.get('/', [validJWT], CategoriaController.funGetCategorias)
router.get('/:id', [validJWT], CategoriaController.funGetCategoria)
router.get('/puzzles', [validJWT], CategoriaController.funGetPuzzles)
router.post('/', [validJWT], CategoriaController.funPostCategoria)
router.put('/:id', [validJWT], CategoriaController.funPutCategoria)
router.delete('/:id', [validJWT], CategoriaController.funDeleteCategoria)

router.get('/funcion/:id', /*[validJWT],*/ CategoriaController.funComprobarSiEsFuncional)
router.get('/sudoku/:id', /*[validJWT],*/ CategoriaController.funCrearSudoku)