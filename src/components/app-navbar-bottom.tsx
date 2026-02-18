import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { MoreHorizontalIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppState } from '@/components/app-state-provider'

const AppNavbarBottom = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navConfig = useAppState((state) => state.navConfig)

  const MAX_NAV_ITEMS = 4
  const navItems = navConfig.navItems
  const visibleItems = navItems.slice(0, MAX_NAV_ITEMS)
  const overflowItems = navItems.slice(MAX_NAV_ITEMS)

  return (
    <div className="h-(--app-navbar-bottom-height) border-t">
      <nav className="flex h-full">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Button
              key={item.to}
              variant="ghost"
              className={cn(
                'min-w-0 flex-1 h-full flex flex-col items-center justify-center gap-1 rounded-none px-1',
                isActive && 'bg-accent text-accent-foreground',
              )}
              onPointerDown={() => {
                navigate({ to: item.to })
              }}
            >
              {item.icon}
              <span className="text-xs leading-tight w-full text-center line-clamp-2">
                {item.label}
              </span>
            </Button>
          )
        })}

        {overflowItems.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="min-w-0 flex-1 h-full flex flex-col items-center justify-center gap-1 rounded-none px-1"
              >
                <MoreHorizontalIcon />
                <span className="text-xs leading-none">More</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {overflowItems.map((item) => (
                <DropdownMenuItem
                  key={item.to}
                  className="flex items-center gap-2"
                  onClick={() => {
                    navigate({ to: item.to })
                  }}
                >
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </div>
  )
}

export default AppNavbarBottom
