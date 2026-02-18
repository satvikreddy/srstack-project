import { useAppState } from '@/components/app-state-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Link, LinkOptions, useLocation } from '@tanstack/react-router'

type Props = {}

const AppSidebar = (props: Props) => {
  const navItems = useAppState((state) => state.navConfig.navItems)

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarItem key={item.to} to={item.to}>
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function SidebarItem(props: {
  to: LinkOptions['to']
  children: React.ReactNode
}) {
  const location = useLocation()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={location.pathname.startsWith(props.to!)}
      >
        <Link to={props.to}>{props.children}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default AppSidebar
