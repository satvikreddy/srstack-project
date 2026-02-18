export function logEventClient(args: LogEventArgs<EventName>) {
  // TODO: implement actual logging like azure app insights, etc
  console.log('logEventClient: ', args)
}

export function logErrorClient(args: LogErrorArgs<ErrorName>) {
  // TODO: implement actual logging
  console.error('logErrorClient: ', args)
}
