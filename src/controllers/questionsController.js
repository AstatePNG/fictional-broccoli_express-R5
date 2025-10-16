export const getAllQuestions = (req, res) => {
    res.status(200).send([
        {
            id: "1",
            question: "Quelle est la capitale de la Bulgarie ?",
            answer: "Sofia"
        }
    ])

}

export const addQuestion = (req, res) => {
    const { question, answer } = req.body

    if(!question || !answer) {
        return res.status(400).send({ error: "Invalid request" })
    }
    res.status(201).send({ message: "Question created" })
}

export const deleteQuestion = (req, res) => {
    const { id } = req.params

    if(!id) {
        return res.status(400).send({ error: "Invalid request" })
    }
    res.status(200).send({ message: `Question ${id} deleted` })
}