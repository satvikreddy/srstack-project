import { createIsomorphicFn } from '@tanstack/react-start'
import { logErrorServer, logEventServer } from './analytics.server'
import { logErrorClient, logEventClient } from './analytics.client'

export const logEvent = createIsomorphicFn()
  .client((opts: LogEventArgs<EventName>) => {
    return logEventClient(opts)
  })
  .server((opts: LogEventArgs<EventName>) => {
    return logEventServer(opts)
  })

export const logError = createIsomorphicFn()
  .client((opts: LogErrorArgs<ErrorName>) => {
    return logErrorClient(opts)
  })
  .server((opts: LogErrorArgs<ErrorName>) => {
    return logErrorServer(opts)
  })
