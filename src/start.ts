import { createStart } from '@tanstack/react-start'
import { errorHandlerMiddleware } from './middleware/error-handler-middleware'

export const startInstance = createStart(() => {
  return {
    functionMiddleware: [errorHandlerMiddleware],
  }
})
