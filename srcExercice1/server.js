import express from 'express'
import todosRouter from './routers/todosRouter.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/todos', todosRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})