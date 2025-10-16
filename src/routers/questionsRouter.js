import { Router } from "express"
import { addQuestion, deleteQuestion, getAllQuestions } from "../controllers/questionsController.js"

const router = Router()

router.get('/', getAllQuestions)
router.post('/', addQuestion)
router.delete('/:id', deleteQuestion)

export default router