import { Button } from '@/components/ui/button'
import { logEvent } from '@/lib/analytics'
import React from 'react'

type Props = {
  label: React.ReactNode
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
