import { defineSchema, defineTable } from 'convex/server'
import { zodToConvexFields } from 'convex-helpers/server/zod4'
import { z } from 'zod'

export const todoSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty'),
  completed: z.boolean().default(false),
  createdAt: z.number(),
})

export default defineSchema({
  todos: defineTable(zodToConvexFields(todoSchema.shape)),
})
