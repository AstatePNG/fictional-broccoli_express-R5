import { email, z } from 'zod'

const roleEnum = z.enum(['ADMIN', 'USER'])

export const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(30, 'Username must be at most 30 charaters'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(50, 'Password must be at most 50 charaters'),
    email: z.email(),
    role: roleEnum.optional()
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const userIdSchema = z.object({
    id: z.uuid()
})