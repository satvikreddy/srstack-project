import { logError } from '@/lib/analytics'
import { createMiddleware } from '@tanstack/react-start'

export const errorHandlerMiddleware = createMiddleware({
  type: 'function',
}).server(async ({ next }) => {
  try {
    return await next()
  } catch (error) {
    // TODO: handle various errors like ForbiddenError, AppError, etc and send appropriate response to client
    // Error thrown in this is visible to client

    logError({
      event: 'error_function_unknown',
      error,
    })
    throw error
  }
})
