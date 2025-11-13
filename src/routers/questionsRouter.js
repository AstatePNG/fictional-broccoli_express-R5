import { Router } from "express"
import { addQuestion, deleteQuestion, getAllQuestions, getQuestion } from "../controllers/questionsController.js"
import { validateBody, validateParams } from "../middleware/validation.js"
import { createQuestionSchema, questionIdSchema } from "../models/question.js"

const router = Router()

router.get('/', getAllQuestions)
router.get('/:id', validateParams(questionIdSchema), getQuestion)
router.post('/', validateBody(createQuestionSchema), addQuestion)
router.delete('/:id', validateParams(questionIdSchema), deleteQuestion)

export default router