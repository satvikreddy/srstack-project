import { createIsomorphicFn } from '@tanstack/react-start'
import { logErrorClient, logEventClient } from './analytics.client'

export const logEvent = createIsomorphicFn()
  .client((opts: LogEventArgs<EventName>) => {
    return logEventClient(opts)
  })
  .server(async (opts: LogEventArgs<EventName>) => {
    const { logEventServer } = await import('./analytics.server')
    return logEventServer(opts)
  })

export const logError = createIsomorphicFn()
  .client((opts: LogErrorArgs<ErrorName>) => {
    return logErrorClient(opts)
  })
  .server(async (opts: LogErrorArgs<ErrorName>) => {
    const { logErrorServer } = await import('./analytics.server')
    return logErrorServer(opts)
  })
