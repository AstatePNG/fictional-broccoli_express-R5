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
    try {
        const { id } = req.params
    
        const [question] = await db.select().from(questionsTable).where(eq(questionsTable.id, id))
        
        if(!question) {
            return res.status(404).json({
                error: `Question ${id} does not exist`
            })
        }

        res.status(200).json(question)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch required question"
        })
    }
}

export const addQuestion = async (req, res) => {
    try {
        const { question, answer, difficulty } = req.body

        const [newQuestion] = await db.insert(questionsTable).values({
            question: question,
            answer: answer,
            difficulty: difficulty,
            createdBy: req.user.userId
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
    try {
        const { id } = req.params

        const [deletedQuestion] = await db.delete(questionsTable).where(eq(questionsTable.id, id)).where(eq(questionsTable.createdBy, req.user.userId)).returning()

        if(!deletedQuestion) {
            return res.status(403).json({
                error: `You didn't create question ${id}`
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