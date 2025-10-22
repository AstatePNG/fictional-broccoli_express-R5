import { Router } from "express"
import { addQuestion, deleteQuestion, getAllQuestions } from "../controllers/questionsController.js"
import { validateBody } from "../middleware/validation.js"

const router = Router()

router.get('/', getAllQuestions)
router.post('/', validateBody, addQuestion)
router.delete('/:id', deleteQuestion)

export default router