import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { usersTable } from "../db/schema.js"

export const getAllUsers = async (req, res) => {
    try {
        const questions = await db.select().from(usersTable).orderBy('username')
        res.status(200).json(questions)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch users"
        })
    }
}

export const addUser = async (req, res) => {
    const { name } = req.body

    if(!name) {
        return res.status(400).send({ error: "Invalid request" })
    }
    res.status(201).send({ message: "User created" })
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!id) {
        return res.status(400).send({ error: "Invalid request" })
    }
    res.status(200).send({ message: `User ${id} deleted` })
}