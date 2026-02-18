export function logEventServer(args: LogEventArgs<EventName>) {
  // TODO: implement actual logging like azure app insights, etc
  console.log('logEventServer: ', args)
}

export function logErrorServer(args: LogErrorArgs<ErrorName>) {
  // TODO: implement actual logging
  console.error('logErrorServer: ', args)
}
