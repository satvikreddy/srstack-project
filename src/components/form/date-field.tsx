import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { AppFieldError, AppFieldLabel } from '@/components/form/field'
import { AppFieldApi } from '@/components/form/field.types'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateFieldProps {
  field: AppFieldApi<Date>
  label: string
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

export const DateField = ({
  field,
  label,
  placeholder = 'Pick a date',
  disabled,
  minDate,
  maxDate,
}: DateFieldProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-1">
      <AppFieldLabel>{label}</AppFieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-normal',
              !field.state.value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="text-muted-foreground" />
            {field.state.value ? format(field.state.value, 'PPP') : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            onSelect={(date) => {
              if (date) {
                field.handleChange(date)
                setOpen(false)
              }
            }}
            disabled={(date) => {
              if (minDate && date < minDate) return true
              if (maxDate && date > maxDate) return true
              return false
            }}
            defaultMonth={field.state.value}
          />
        </PopoverContent>
      </Popover>
      <AppFieldError field={field} />
    </div>
  )
}
