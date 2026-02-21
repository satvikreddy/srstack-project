import { AppFieldError, AppFieldLabel } from '@/components/form/field'
import { AppFieldApi } from '@/components/form/field.types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectFieldProps {
  field: AppFieldApi<string>
  label: string
  placeholder?: string
  disabled?: boolean
  options: Array<{ label: string; value: string }>
}

export const SelectField = ({
  field,
  label,
  placeholder = 'Select an option',
  disabled,
  options,
}: SelectFieldProps) => {
  return (
    <div className="space-y-1">
      <AppFieldLabel>{label}</AppFieldLabel>
      <Select
        value={field.state.value ?? ''}
        onValueChange={field.handleChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <AppFieldError field={field} />
    </div>
  )
}
