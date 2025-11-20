import { eq } from "drizzle-orm"
import { db } from "../db/database.js"
import { categoriesTable } from "../db/schema.js"

export const getAllCategories = async (req, res) => {
    try {
        const categories = await db.select().from(categoriesTable).orderBy('id')
        res.status(200).json(categories)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch categories"
        })
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params
    
        const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id))
        
        if(!category) {
            return res.status(404).json({
                error: `Category ${id} does not exist`
            })
        }

        res.status(200).json(category)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to fetch required category"
        })
    }
}

export const addCategory = async (req, res) => {
    try {
        const { title, description } = req.body

        const [newCategory] = await db.insert(categoriesTable).values({
            title: title,
            description: description
        }).returning()
        return res.status(201).json({
            message: "Category created successfully",
            category: newCategory
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: "Failed to create category"
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        const [deletedQuestion] = await db.delete(categoriesTable).where(eq(categoriesTable.id, id)).returning()

        if(!deletedQuestion) {
            return res.status(404).json({
                error: `Category ${id} does not exist`
            })
        }

        res.status(200).json({ 
            message: `Category deleted`,
            categoryDetail: deletedCategory
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: `Failed to delete category ${id}`
        })
    }
}