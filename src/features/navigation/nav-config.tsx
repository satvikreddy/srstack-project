import { LinkOptions } from '@tanstack/react-router'
import {} from 'lucide-react'

type NavItem = {
  icon: React.ReactNode
  label: string
  to: LinkOptions['to']
}

type NavConfig = {
  navItems: NavItem[]
}

const getNavConfig = (): NavConfig => {
  const navItems: NavItem[] = [
    // {
    //   icon: <ListIcon />,
    //   label: 'Tasks',
    //   to: '/tasks',
    // },
  ]

  return {
    navItems,
  }
}

export type { NavConfig }
export { getNavConfig }
