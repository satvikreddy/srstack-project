import { AppFieldError, AppFieldLabel } from '@/components/form/field'
import { AppFieldApi } from '@/components/form/field.types'
import { Input } from '@/components/ui/input'

interface TextFieldProps {
  field: AppFieldApi<string>
  label: string
  placeholder?: string
  type?: React.ComponentProps<'input'>['type']
  disabled?: boolean
}

export const TextField = ({
  field,
  label,
  placeholder,
  type = 'text',
  disabled,
}: TextFieldProps) => {
  return (
    <div className="space-y-1">
      <AppFieldLabel>{label}</AppFieldLabel>
      <Input
        type={type}
        value={field.state.value ?? ''}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-autocomplete="none"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
      />
      <AppFieldError field={field} />
    </div>
  )
}
