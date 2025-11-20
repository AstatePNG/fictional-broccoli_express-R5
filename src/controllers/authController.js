import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { usersTable } from "../db/schema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const register = async (req, res) => {
    try {
        const { email, username, password, role } = req.body
    
        const hashedPassword = await bcrypt.hash(password, 10)

        const [user] = await db.insert(usersTable).values({
            email: email,
            username: username,
            password: hashedPassword,
            role: role
        })
        .returning({
            id: usersTable.id,
            email: usersTable.email,
            username: usersTable.username,
            role: usersTable.role
        })

        const token = jwt.sign({userId: user.id, userRole: user.role}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.status(201).json([{
            message: 'user created successfully',
            userData : user,
            token
        }])
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Registration failed"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const [user] = await db.select()
        .from(usersTable)
        .where(
            eq(usersTable.email, email)
        )

        if(!user) {
            return res.status(401).json([{
                message: 'Invalid credentials'
            }])
        }

        const passwordMatches = await bcrypt.compare(password, user.password)

        if(!passwordMatches) {
            return res.status(401).json([{
                message: 'Invalid credentials'
            }])
        }

        const token = jwt.sign({userId: user.id, userRole: user.role}, process.env.JWT_SECRET, {expiresIn: '24h'})

        res.status(200).json([{
            message: 'user connected successfully',
            userData: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            },
            token
        }])

    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Registration failed"
        })
    }
}