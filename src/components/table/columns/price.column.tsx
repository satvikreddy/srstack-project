import {
  appColumn,
  CreateColumnProps,
} from '@/components/table/columns/base.column'
import { formatPriceNeat } from '@/utils/price.util'
import { RowData } from '@tanstack/react-table'

export function priceColumn<TData extends RowData>(
  args: Omit<CreateColumnProps<TData, number>, 'cell'> & {
    currency?: string
    locale?: string
  },
) {
  const { currency = 'INR', locale = 'en-IN', ...rest } = args
  return appColumn<TData, number>({
    ...rest,
    cell: (info) => (
      <div className="text-right">
        {formatPriceNeat(info.getValue(), currency, locale)}
      </div>
    ),
  })
}
