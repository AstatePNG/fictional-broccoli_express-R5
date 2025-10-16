import { Router } from "express"
import { addUser, deleteUser, getAllUsers } from "../controllers/usersController.js"

const router = Router()

router.get('/', getAllUsers)
router.post('/', addUser)
router.delete('/:id', deleteUser)

export default router