import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { usersTable } from "../db/schema.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body
    
        const hashedPassword = await bcrypt.hash(password, 10)

        const [user] = await db.insert(usersTable).values({
                email: email,
                username: username,
                password: hashedPassword
            })
            .returning({
                id: usersTable.id,
                email: usersTable.email,
                username: usersTable.username
            })

        res.status(201).json([{
            message: 'user created successfully',
            userData : user,
            token: "TOKEN"
        }])
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Registration failed"
        })
    }
}