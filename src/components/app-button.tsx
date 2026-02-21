import { Button } from '@/components/ui/button'
import { logEvent } from '@/lib/analytics'

type Props = {
  label: string
  onClick: () => void
}

const AppButton = (props: Props) => {
  return (
    <Button
      variant="outline"
      onClick={
        props.onClick
          ? () => {
              logEvent({
                event: 'button_clicked',
                data: {
                  buttonLabel: props.label,
                },
              })
              props.onClick()
            }
          : undefined
      }
    >
      {props.label}
    </Button>
  )
}

export default AppButton
