import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'crypto'

export const questionsTable = sqliteTable('question', {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    question: text({ lenght: 300 }).notNull(),
    answer: text({ lenght: 300 }).notNull(),
    difficulty: text({ enum: ['easy', 'medium', 'difficult']}).notNull().default('easy'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
})