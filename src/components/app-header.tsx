import { SITE_NAME } from '@/siteConfig'

function AppHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <div className="flex items-center gap-3">
          <img
            src="/icon.png"
            alt={SITE_NAME + ' logo'}
            className="h-4 w-4 object-contain"
          />
          <h1 className="text-sm font-semibold sm:block">{SITE_NAME}</h1>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
