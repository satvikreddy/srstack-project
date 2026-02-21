export type AppFieldApi<TValue> = {
  state: {
    value: TValue | undefined
    meta: {
      errors: Array<string | { message: string } | undefined>
    }
  }
  handleChange: (value: TValue) => void
  handleBlur: () => void
}
