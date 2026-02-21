import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware({ type: 'function' })
  .client(async ({ next }) => {
    return next({ sendContext: {} })
  })
  .server(async ({ next, context }) => {
    // TODO: extract userId from auth, pass user info and permissions and pass in context

    return next({
      context: {
        user: {},
      },
    })
  })
