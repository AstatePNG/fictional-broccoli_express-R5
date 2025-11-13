import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { questionsTable } from "../db/schema.js"

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await db.select().from(questionsTable).orderBy('createdAt', 'desc')
        res.status(200).json(questions)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch questions"
        })
    }
}

export const getQuestion = async (req, res) => {
    const { id } = req.params

    try {
        const [question] = await db.select().from(questionsTable).where(eq(questionsTable.id, id))
        
        if(!question) {
            return res.status(404).json({
                error: `Question ${id} doesn't exist`
            })
        }

        res.status(200).json(question)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch questions"
        })
    }
}

export const addQuestion = async (req, res) => {
    const { question, answer, difficulty } = req.body

    try {
        const [newQuestion] = await db.insert(questionsTable).values({
            question: question,
            answer: answer,
            difficulty: difficulty
        }).returning()
        return res.status(201).json({
            message: "Question created successfully",
            question: newQuestion
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to create question"
        })
    }
}

export const deleteQuestion = async (req, res) => {
    const { id } = req.params

    try {
        const [deletedQuestion] = await db.delete(questionsTable).where(eq(questionsTable.id, id)).returning()

        if(!deletedQuestion) {
            return res.status(404).json({
                error: `Question ${id} doesn't exist`
            })
        }

        res.status(200).json({ 
            message: `Question deleted`,
            questionDetail: deletedQuestion
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: `Failed to delete question ${id}`
        })
    }
}