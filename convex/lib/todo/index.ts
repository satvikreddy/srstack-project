import z from 'zod'
import { convexAction, convexMutation, convexQuery } from '../builder'
import { todoSchema } from '../../schema'
import { api } from '../../_generated/api'

export const todoList = convexQuery.handler(async (ctx) => {
  return ctx.db.query('todos').order('desc').collect()
})

export const todoCreate = convexMutation
  .input(z.object({ text: todoSchema.shape.text }))
  .handler(async (ctx, input) => {
    return ctx.db.insert('todos', {
      text: input.text,
      createdAt: Date.now(),
    })
  })

export const todoCreateRandomAction = convexAction.handler(async (ctx) => {
  const title = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => json.title as string)

  await ctx.runMutation(api.todo.create, { text: title })

  return title
})
