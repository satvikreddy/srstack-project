import { auth, clerkClient } from '@clerk/tanstack-react-start/server'
import { createMiddleware } from '@tanstack/react-start'

export const authMiddleware = createMiddleware({ type: 'function' })
  .client(async ({ next }) => {
    return next({ sendContext: {} })
  })
  .server(async ({ next, context }) => {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      throw new Error('User not authenticated')
    }

    const clerkUser = await clerkClient().users.getUser(clerkId)
    const permissions = clerkUser.publicMetadata?.permissions as
      | Permission[]
      | undefined

    if (!Array.isArray(permissions)) throw new Error('User not configured')

    return next({
      context: {
        user: {},
      },
    })
  })
