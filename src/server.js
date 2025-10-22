import express from 'express'
import questionsRouter from './routers/questionsRouter.js'
import usersRouter from './routers/usersRouter.js'
import logger from './middleware/logger.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(logger)

app.use('/questions', questionsRouter)
app.use('/users', usersRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})