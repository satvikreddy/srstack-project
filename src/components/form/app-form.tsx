import { Button } from '@/components/ui/button'
import { logEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import { ReactFormExtendedApi } from '@tanstack/react-form'
import { toast } from 'sonner'

type AppFormProps<TFormData> = {
  className?: string
  form: ReactFormExtendedApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
  children: React.ReactNode
}

export const AppForm = <TFormData,>({
  className,
  form,
  children,
}: AppFormProps<TFormData>) => {
  return (
    <form
      className={cn(
        'flex-1 space-y-4 overflow-y-auto pb-4 px-1 pt-1',
        className,
      )}
      onSubmit={form.handleSubmit}
    >
      {children}
    </form>
  )
}

type AppFormSubscribeProps<TFormData> = {
  form: ReactFormExtendedApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >
  children: (args: {
    isSubmitDisabled: boolean
    isTouched: boolean
  }) => React.ReactNode
}

export const AppFormSubscribe = <TFormData,>({
  form,
  children,
}: AppFormSubscribeProps<TFormData>) => {
  return (
    <form.Subscribe
      selector={(state) => [
        state.canSubmit,
        state.isSubmitting,
        state.isPristine,
        state.isTouched,
      ]}
      children={([canSubmit, isSubmitting, isPristine, isTouched]) =>
        children({
          isTouched,
          isSubmitDisabled: isPristine || !canSubmit || isSubmitting,
        })
      }
    />
  )
}

export const AppFormSubmitButton = (props: {
  className?: string
  icon?: React.ReactNode
  label: string
  isSubmitDisabled: boolean
  isTouched: boolean
  onClick: () => void
}) => {
  return (
    <Button
      className={props.className}
      type="submit"
      variant={props.isTouched ? 'default' : 'outline'}
      disabled={props.isSubmitDisabled}
      onClick={() => {
        logEvent({
          event: 'form_submit_button_clicked',
          data: {
            buttonLabel: props.label,
          },
        })
        props.onClick()
      }}
    >
      {props.icon}
      {props.label}
    </Button>
  )
}

export const onAppFormSubmit = async <TResult,>(args: {
  execute: () => Promise<TResult>
}) => {
  try {
    const result = await args.execute()
    return result
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Something went wrong')
    throw error
  }
}
