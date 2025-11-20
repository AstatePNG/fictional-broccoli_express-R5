import { Router } from "express"
import { getUser, deleteUser, getAllUsers } from "../controllers/usersController.js"
import { validateParams } from "../middleware/validation.js"
import { userIdSchema } from "../models/user.js"
import { authorizationToken } from "../middleware/authorizationToken.js"

const router = Router()

router.use(authorizationToken)

router.get('/', getAllUsers)
router.get('/:id', validateParams(userIdSchema), getUser)
router.delete('/:id', validateParams(userIdSchema), deleteUser)

export default router