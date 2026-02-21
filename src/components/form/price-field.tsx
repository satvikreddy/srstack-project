import { AppFieldError, AppFieldLabel } from '@/components/form/field'
import { AppFieldApi } from '@/components/form/field.types'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PriceFieldProps {
  field: AppFieldApi<number>
  label: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const PriceField = ({
  field,
  label,
  placeholder,
  disabled,
  className,
}: PriceFieldProps) => {
  return (
    <div className={cn('space-y-1', className)}>
      <AppFieldLabel>{label}</AppFieldLabel>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-2.5 select-none text-sm text-muted-foreground">
          ₹
        </span>
        <Input
          type="number"
          min={0}
          step="0.01"
          value={field.state.value ?? ''}
          onChange={(e) => {
            const raw = e.target.value
            field.handleChange(raw === '' ? (null as any) : Number(raw))
          }}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="pl-7"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <AppFieldError field={field} />
    </div>
  )
}
