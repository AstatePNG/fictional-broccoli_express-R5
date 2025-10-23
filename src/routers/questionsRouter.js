import { Router } from "express"
import { addQuestion, deleteQuestion, getAllQuestions } from "../controllers/questionsController.js"
import { validateBody, validateParams } from "../middleware/validation.js"
import { createQuestionSchema, questionIdSchema } from "../models/question.js"

const router = Router()

router.get('/', getAllQuestions)
router.post('/', validateBody(createQuestionSchema), addQuestion)
router.delete('/:id', validateParams(questionIdSchema), deleteQuestion)

export default router