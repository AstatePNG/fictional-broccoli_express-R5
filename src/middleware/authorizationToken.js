import jwt from "jsonwebtoken"
import 'dotenv/config'

export const authorizationToken = (req, res, next) => {
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
        const userRole = decodedToken.userRole

        if(userRole !== 'ADMIN') {
            return res.status(404).json({
                error: 'Page not found'
            })
        }

        req.user = { userId, userRole }

        next()

    } catch (err) {
        res.status(401).json({
            error: 'Invalid token'
        })
    }
}