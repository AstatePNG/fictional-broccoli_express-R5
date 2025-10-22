import { z } from 'zod'

const difficultyEnum = z.enum(['easy','medium','difficult'])

export const createQuestionSchema = z.object({
    question: z.string().min(1, 'Question is required').max(300, 'Question must be at most 300 charaters'),
    answer: z.string().min(1, 'Answer is required').max(300, 'Answer must be at most 300 charaters'),
    difficulty: difficultyEnum,
})

export const questionIdSchema = z.object({
    id: z.uuid(),
})