import {
  appColumn,
  CreateColumnProps,
} from '@/components/table/columns/base.column'
import { RowData } from '@tanstack/react-table'

export function textColumn<TData extends RowData>(
  args: Omit<CreateColumnProps<TData, string>, 'cell'>,
) {
  return appColumn<TData, string>({
    ...args,
    cell: (info) => info.getValue(),
  })
}
