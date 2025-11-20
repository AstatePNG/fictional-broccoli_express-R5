import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'crypto'
import { title } from 'process'

export const questionsTable = sqliteTable('question', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    question: text({ lenght: 300 })
        .notNull(),
    answer: text({ lenght: 300 })
        .notNull(),
    difficulty: text({ enum: ['easy', 'medium', 'difficult']})
        .notNull()
        .default('easy'),
    category: integer()
        .references(() => categoriesTable.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .notNull()
        .$defaultFn(() => new Date()),
    createdBy: text()
        .references(() => usersTable.id, { onDelete: 'cascade' })
        .notNull()
})

export const usersTable = sqliteTable('user', {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    email: text()
        .notNull()
        .unique(),
    password: text({lenght: 255})
        .notNull(),
    username: text({length: 30})
        .notNull()
        .unique(),
    role: text({lenght: 5})
        .notNull()
        .$defaultFn(() => 'USER')
})

export const categoriesTable = sqliteTable('category', {
    id: integer()
        .primaryKey(),
    title: text({length: 50})
        .notNull(),
    description: text({length: 500})
        .notNull()
})