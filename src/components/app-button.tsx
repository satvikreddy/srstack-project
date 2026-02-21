import { Button } from '@/components/ui/button'
import { logEvent } from '@/lib/analytics'

type Props = {
  className?: string
  label: string
  onClick: () => void
}

const AppButton = (props: Props) => {
  return (
    <Button
      className={props.className}
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
