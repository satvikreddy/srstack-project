import { Button } from '@/components/ui/button'
import {
  CellContext,
  Column,
  ColumnDef,
  ColumnDefTemplate,
  DeepKeys,
  RowData,
} from '@tanstack/react-table'
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from 'lucide-react'

export type CreateColumnProps<TData extends RowData, TValue> = {
  key: DeepKeys<TData>
  headerLabel: string
  isSortable?: boolean
  cell: ColumnDefTemplate<CellContext<TData, TValue>>
}

export function appColumn<TData extends RowData, TValue>(
  props: CreateColumnProps<TData, TValue>,
): ColumnDef<TData, TValue> {
  return {
    accessorKey: props.key,
    header: ({ column }) =>
      ColumnHeader({
        headerLabel: props.headerLabel,
        isSortable: props.isSortable,
        column,
      }),
    cell: props.cell,
    enableSorting: !!props.isSortable,
  }
}

const ColumnHeader = <TData,>(args: {
  isSortable?: boolean
  headerLabel: string
  column: Column<TData>
}) => {
  const { column } = args

  let suffix: React.ReactNode = null

  if (args.isSortable) {
    const isSorted = column.getIsSorted()
    if (!isSorted) suffix = <ArrowUpDownIcon className="h-4 w-4 opacity-10" />
    if (isSorted === 'asc') suffix = <ArrowUpIcon className="h-4 w-4" />
    if (isSorted === 'desc') suffix = <ArrowDownIcon className="h-4 w-4" />
  }

  return (
    <Button
      variant="ghost"
      onClick={
        args.isSortable
          ? () => column.toggleSorting(column.getIsSorted() === 'asc')
          : undefined
      }
    >
      {args.headerLabel}
      {suffix}
    </Button>
  )
}
