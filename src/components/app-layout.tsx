import AppHeader from '@/components/app-header'
import AppNavbarBottom from '@/components/app-navbar-bottom'
import AppSidebar from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="h-svh overflow-hidden [--header-height:calc(--spacing(14))] md:[--header-height:calc(--spacing(10))]"
      style={
        {
          '--app-navbar-bottom-height': '50px',
        } as React.CSSProperties
      }
    >
      <SidebarProvider className="flex flex-col h-full">
        <AppHeader />
        <>
          <div className="flex flex-1 overflow-hidden md:pb-0 pb-(--app-navbar-bottom-height)">
            <AppSidebar />
            <SidebarInset className="overflow-y-auto">{children}</SidebarInset>
          </div>
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            <AppNavbarBottom />
          </div>
        </>
      </SidebarProvider>
    </div>
  )
}
