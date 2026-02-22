import AppButton from '@/components/app-button'
import {
  AppForm,
  AppFormSubmitButton,
  AppFormSubscribe,
} from '@/components/form/app-form'
import { DateField } from '@/components/form/date-field'
import { DateTimeField } from '@/components/form/date-time-field'
import { AppFieldApi } from '@/components/form/field.types'
import { PriceField } from '@/components/form/price-field'
import SearchableDropdownField from '@/components/form/searchable-dropdown-field'
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
      book: undefined as Book | undefined,
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

        <form.Field name="book">
          {(field) => <SearchableDropdownFieldExample field={field} />}
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

//* Searchable dropdown field example
type Book = {
  id: string
  title: string
  author: string
  publicationYear: number
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publicationYear: 1925,
  },
  { id: '2', title: '1984', author: 'George Orwell', publicationYear: 1949 },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publicationYear: 1960,
  },
]

import * as React from 'react'
import { useDebounced } from '@/utils/use-debounced'

function SearchableDropdownFieldExample(props: { field: AppFieldApi<Book> }) {
  const getSuggestionsUnbounced = async (text: string) => {
    if (text.length < 2) return null

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const lowerText = text.toLowerCase()
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(lowerText) ||
        b.author.toLowerCase().includes(lowerText),
    )
  }

  const currentResolveRef = React.useRef<
    ((value: Book[] | null) => void) | null
  >(null)

  const debouncedFn = useDebounced((text: string) => {
    getSuggestionsUnbounced(text).then((res) => {
      if (currentResolveRef.current) currentResolveRef.current(res)
    })
  }, 1000)

  const debouncedGetSuggestions = React.useCallback(
    (text: string) => {
      return new Promise<Book[] | null>((resolve) => {
        currentResolveRef.current = resolve
        debouncedFn(text)
      })
    },
    [debouncedFn],
  )

  return (
    <SearchableDropdownField
      field={props.field}
      label="Book"
      getSuggestions={debouncedGetSuggestions}
      itemBuilder={(item) => (
        <div className="text-sm">
          <div className="font-medium">{item.title}</div>
          <div className="text-muted-foreground text-xs">{item.author}</div>
        </div>
      )}
      suggestionBuilder={(item) => (
        <div className="w-full">
          <div className="font-medium">{item.title}</div>
          <div className="text-muted-foreground text-xs">
            {item.author} - {item.publicationYear}
          </div>
        </div>
      )}
    />
  )
}
