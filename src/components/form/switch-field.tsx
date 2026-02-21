import { AppFieldLabel } from '@/components/form/field'
import { AppFieldApi } from '@/components/form/field.types'
import { Switch } from '@/components/ui/switch'

interface SwitchFieldProps {
  field: AppFieldApi<boolean>
  label: string
}

export const SwitchField = ({ field, label }: SwitchFieldProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <AppFieldLabel>{label}</AppFieldLabel>
        <Switch
          size="default"
          checked={field.state.value ?? false}
          onCheckedChange={field.handleChange}
        />
      </div>
    </div>
  )
}
