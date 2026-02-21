import AppButton from '@/components/app-button'
import {
  AppForm,
  AppFormSubmitButton,
  AppFormSubscribe,
} from '@/components/form/app-form'
import { DateField } from '@/components/form/date-field'
import { DateTimeField } from '@/components/form/date-time-field'
import { PriceField } from '@/components/form/price-field'
import { SelectField } from '@/components/form/select-field'
import { SwitchField } from '@/components/form/switch-field'
import { TextField } from '@/components/form/text-field'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
      salary: undefined as number | undefined,
      isRequired: false,
      birthDate: undefined as Date | undefined,
      meetingTime: undefined as Date | undefined,
      role: undefined as string | undefined,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2))
    },
  })

  return (
    <div className="max-w-lg p-6">
      <AppForm className="flex-1 space-y-4 overflow-y-auto pb-4" form={form}>
        <form.Field name="name">
          {(field) => <TextField field={field} label="Name" />}
        </form.Field>
        <form.Field name="isRequired">
          {(field) => <SwitchField field={field} label="Mandatory" />}
        </form.Field>
        <form.Field name="salary">
          {(field) => <PriceField field={field} label="Salary" />}
        </form.Field>

        <form.Field name="birthDate">
          {(field) => <DateField field={field} label="Birth Date" />}
        </form.Field>

        <form.Field name="meetingTime">
          {(field) => (
            <DateTimeField
              field={field}
              label="Meeting Time"
              minDate={new Date()}
            />
          )}
        </form.Field>

        <form.Field name="role">
          {(field) => (
            <SelectField
              field={field}
              label="Role"
              placeholder="Select a role"
              options={[
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
                { label: 'Viewer', value: 'viewer' },
              ]}
            />
          )}
        </form.Field>
      </AppForm>

      <AppFormSubscribe
        form={form}
        children={({ isSubmitDisabled, isTouched }) => (
          <div className="flex gap-2 sm:justify-end">
            <AppButton
              className="flex-1 shrink sm:flex-none sm:shrink-0"
              label="Cancel"
              onClick={() => {}}
            />
            <AppFormSubmitButton
              className="flex-1 shrink sm:flex-none sm:shrink-0"
              label="Save"
              isSubmitDisabled={isSubmitDisabled}
              isTouched={isTouched}
              onClick={() => form.handleSubmit()}
            />
          </div>
        )}
      />
    </div>
  )
}
