import jwt from "jsonwebtoken"
import 'dotenv/config'

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if(!token) {
            return res.status(401).json({
                error: 'Token is required'
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decodedToken.userId
        req.user = { userId }

        next()

    } catch (err) {
        res.status(401).json({
            error: 'Invalid token'
        })
    }
}