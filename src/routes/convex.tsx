import { createFileRoute } from '@tanstack/react-router'
import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from 'convex/_generated/api'
import { Button } from '@/components/ui/button'
import { createServerFn } from '@tanstack/react-start'
import { convexHttp } from '@/integrations/convex/convex'

const createRandomTodoServerFn = createServerFn().handler(async (ctx) => {
  const title = await convexHttp.action(api.todo.createRandomAction)
  return { title }
})

export const Route = createFileRoute('/convex')({
  component: RouteComponent,
})

function RouteComponent() {
  const todos = useQuery(api.todo.list)
  const create = useMutation(api.todo.create)
  const createRandom = useAction(api.todo.createRandomAction)

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Button onClick={() => create({ text: 'New item' })}>
          Convex: Add Item
        </Button>
        <Button variant="outline" onClick={() => createRandom()}>
          Convex: Add Random
        </Button>
        <Button variant="outline" onClick={() => createRandomTodoServerFn()}>
          ServerFn: Add Random
        </Button>
      </div>
      <ul className="list-disc list-inside space-y-1">
        {todos?.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}
