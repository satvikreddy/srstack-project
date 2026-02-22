import AppTable from '@/components/table/app-table'
import { numberColumn } from '@/components/table/columns/number.column'
import { priceColumn } from '@/components/table/columns/price.column'
import { textColumn } from '@/components/table/columns/text.column'
import { createFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/table')({
  component: RouteComponent,
})

type Data = {
  id: string
  name: string
  age: number
  salary: number
  otherData: any
}

const data: Data[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 25,
    salary: 100000,
    otherData: {
      address: '123 Main St, Anytown, USA',
      phone: '123-456-7890',
    },
  },
  {
    id: '2',
    name: 'Jane Doe',
    age: 26,
    salary: 150000,
    otherData: {
      address: '123 Main St, Anytown, USA',
      phone: '123-456-7890',
    },
  },
]

const columns: ColumnDef<Data, any>[] = [
  textColumn({ key: 'name', headerLabel: 'Name', isSortable: true }),
  numberColumn({ key: 'age', headerLabel: 'Age', isSortable: true }),
  priceColumn({ key: 'salary', headerLabel: 'Salary', isSortable: true }),
]

function RouteComponent() {
  return <AppTable columns={columns} data={data} />
}
