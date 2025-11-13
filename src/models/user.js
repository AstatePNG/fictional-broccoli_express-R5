import { z } from 'zod'

export const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(30, 'Username must be at most 30 charaters'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(50, 'Password must be at most 50 charaters'),
    email: z.email(),
})