import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { AppFieldError, AppFieldLabel } from '@/components/form/field'
import { AppFieldApi } from '@/components/form/field.types'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateTimeFieldProps {
  field: AppFieldApi<Date>
  label: string
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

function mergeDateTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number)
  const merged = new Date(date)
  merged.setHours(hours ?? 0, minutes ?? 0, 0, 0)
  return merged
}

function formatTime(date: Date): string {
  return format(date, 'HH:mm')
}

export const DateTimeField = ({
  field,
  label,
  placeholder = 'Pick date & time',
  disabled,
  minDate,
  maxDate,
}: DateTimeFieldProps) => {
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
            {field.state.value
              ? format(field.state.value, 'PPP p')
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            onSelect={(date) => {
              if (!date) return
              const currentTime = field.state.value
                ? formatTime(field.state.value)
                : '00:00'
              field.handleChange(mergeDateTime(date, currentTime))
            }}
            disabled={(date) => {
              if (minDate && date < minDate) return true
              if (maxDate && date > maxDate) return true
              return false
            }}
            defaultMonth={field.state.value}
          />
          <div className="border-t px-3 py-2">
            <Input
              type="time"
              value={field.state.value ? formatTime(field.state.value) : ''}
              onChange={(e) => {
                const base = field.state.value ?? new Date()
                field.handleChange(mergeDateTime(base, e.target.value))
              }}
              disabled={disabled}
            />
          </div>
        </PopoverContent>
      </Popover>
      <AppFieldError field={field} />
    </div>
  )
}
