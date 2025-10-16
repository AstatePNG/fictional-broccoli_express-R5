import { error } from "console"
import { appendFile } from "fs"
import "fs/promises"

const todosFile = "todos.json"

export const addTodo = (req, res) => {
    const { text, completed } = req.body
    if(!text) {
        return res.status(400).send({
            error: "Invalid body"
        })
    }
    const id = crypto.randomUUID()
    const completedVal = completed || false
    const todo = {
        id: id,
        text: text,
        completed: completedVal
    }
    const data = JSON.stringify(todo)
    console.log(data)
    appendFile(todosFile, data, 'utf-8', (err) => {
        console.log(err)
        return res.status(500).send({
            error: err
        })
    })
    res.status(201).send({
        message: `The todo ${id} has been created succesfully`,
        id: id
    })
}

export const getTodo = (req, res) => {
    const { id } = req.params

}

export const updateTodo = (req, res) => {
    const { id } = req.params
    const { completed } = req.body

}