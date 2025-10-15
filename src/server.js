import { error } from 'console'
import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.get('/questions', (req, res) => {
    res.status(200).send([
        {
            id: "1",
            question: "Quelle est la capitale de la Bulgarie ?",
            answer: "Sofia"
        }
    ])

})

app.post('/questions', (req, res) => {
    const { question, answer } = req.body

    if(!question || !answer) {
        return res.status(400).send({ error: "Invalid request" })
    }
    res.status(201).send({ message: "Question created" })
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})