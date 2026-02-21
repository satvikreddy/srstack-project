type LogEventArgs<TEventName> = {
  event: TEventName
  data?: Record<string, unknown>
}

type LogErrorArgs<TErrorName> = {
  event: TErrorName

  /** caught error */
  error?: any

  data?: Record<string, unknown>
}
