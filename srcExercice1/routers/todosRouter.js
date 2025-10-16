import { Router } from "express"
import { addTodo, getTodo, updateTodo } from "../controllers/todosController.js"

const router = Router()

router.post('/', addTodo)
router.get('/:id', getTodo)
router.patch('/:id', updateTodo)

export default router