import { authMiddleware } from '@/middleware/auth-middleware'
import { createServerFn } from '@tanstack/react-start'

export const createServerFn_uiCallable = createServerFn().middleware([
  authMiddleware,
])
