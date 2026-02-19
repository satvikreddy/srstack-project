import { createStart } from '@tanstack/react-start'
import { clerkMiddleware } from '@clerk/tanstack-react-start/server'
import { errorHandlerMiddleware } from './middleware/error-handler-middleware'

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [clerkMiddleware()],
    functionMiddleware: [errorHandlerMiddleware],
  }
})
