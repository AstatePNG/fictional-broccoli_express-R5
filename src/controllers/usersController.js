export const getAllUsers = (req, res) => {
    res.status(200).send([
        {
            message: "Get all users"
        }
    ])

}

export const addUser = (req, res) => {
    const { name } = req.body

    if(!name) {
        return res.status(400).send({ error: "Invalid request" })
    }
    res.status(201).send({ message: "User created" })
}

export const deleteUser = (req, res) => {
    const { id } = req.params

    if(!id) {
        return res.status(400).send({ error: "Invalid request" })
    }
    res.status(200).send({ message: `User ${id} deleted` })
}