import {
  appColumn,
  CreateColumnProps,
} from '@/components/table/columns/base.column'
import { RowData } from '@tanstack/react-table'

export function numberColumn<TData extends RowData>(
  args: Omit<CreateColumnProps<TData, number>, 'cell'>,
) {
  return appColumn<TData, number>({
    ...args,
    cell: (info) => <div className="text-right">{info.getValue()}</div>,
  })
}
