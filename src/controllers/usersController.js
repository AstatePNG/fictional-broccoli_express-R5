import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { usersTable } from "../db/schema.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await db.select().from(usersTable).orderBy('username')
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch users"
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params

        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id))

        if(!user) {
            return res.status(404).json({
                error: `User ${id} does not exist`
            })
        }

        res.status(200).json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch required user"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const [deletedUser] = await db.delete(usersTable).where(eq(usersTable.id, id)).returning()

        if(!deleteUser) {
            return res.status(404).json({
                error: `User ${id} does not exist`
            })
        }

        res.status(200).json({ 
            message: `User deleted`,
            userDetail: deletedUser
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: `Failed to delete user ${id}`
        })
    }
}