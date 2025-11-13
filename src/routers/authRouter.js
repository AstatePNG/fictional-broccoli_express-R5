import { Router } from "express"
import { register } from "../controllers/authController.js"
import { validateBody } from "../middleware/validation.js"
import { userSchema } from "../models/user.js"

const router = Router()

router.post('/register', validateBody(userSchema), register)

export default router