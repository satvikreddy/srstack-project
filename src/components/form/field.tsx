import { fieldLabelSize } from '@/components/ui/field-styles'
import { AppFieldApi } from '@/components/form/field.types'

export const AppFieldLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${fieldLabelSize} font-medium text-muted-foreground`}>
      {children}
    </div>
  )
}

export const AppFieldError = ({ field }: { field: AppFieldApi<any> }) => {
  const errors = field.state.meta.errors
  const hasError = errors && errors.length > 0

  if (!hasError) return null

  return (
    <p className="text-xs text-destructive">
      {typeof errors[0] === 'string'
        ? errors[0]
        : (errors[0]?.message ?? 'Invalid value')}
    </p>
  )
}
