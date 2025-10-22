import { ZodError } from "zod"

export const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body)
            next()
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).send({
                    error: 'validation failed',
                    details: error.issues.map((issue) => issue.message)
                })
            }
        }
        res.status(500).send({
            error: 'Internal server error'
        })
    }
}