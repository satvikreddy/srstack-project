import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { auth } from '@clerk/tanstack-react-start/server'
import {
  useAuth,
  useUser,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/tanstack-react-start'
import { useEffect } from 'react'

// --- Server Function ---
// Runs on the server when called from the client
const getServerUserId = createServerFn({ method: 'GET' }).handler(async () => {
  const { userId } = await auth()
  console.log('[SERVER FN] Clerk userId:', userId ?? 'not logged in')
  return { userId }
})

// --- SSR Loader ---
// Runs on the server during SSR (before the page is sent to the client)
export const Route = createFileRoute('/clerk')({
  loader: async () => {
    const { userId } = await auth()
    console.log('[SSR LOADER] Clerk userId:', userId ?? 'not logged in')
    return { ssrUserId: userId }
  },
  component: ClerkExamplePage,
})

function ClerkExamplePage() {
  // --- Client Side ---
  // Runs in the browser
  const { userId } = useAuth()
  const { user } = useUser()
  const { ssrUserId } = Route.useLoaderData()

  useEffect(() => {
    console.log('[CLIENT] Clerk userId:', userId ?? 'not logged in')
  }, [userId])

  const handleServerFnClick = async () => {
    const result = await getServerUserId()
    console.log(
      '[CLIENT received from SERVER FN] Clerk userId:',
      result.userId ?? 'not logged in',
    )
    alert(`Server fn userId: ${result.userId ?? `not logged in`}`)
  }

  return (
    <div className="p-8 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Clerk Auth ID Example</h1>

      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Current User
        </h2>
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton />
            <div className="text-sm">
              <p className="font-medium">
                {user?.fullName ??
                  user?.username ??
                  user?.primaryEmailAddress?.emailAddress}
              </p>
              <p className="text-muted-foreground font-mono text-xs">
                {userId}
              </p>
            </div>
          </div>
          <SignOutButton>
            <button className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
              Sign Out
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <p className="text-sm text-muted-foreground italic">Not signed in.</p>
          <SignInButton mode="modal">
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </section>

      <section className="space-y-1 rounded-lg border p-4">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          SSR Loader (server)
        </h2>
        <p className="font-mono text-sm break-all">
          {ssrUserId ?? (
            <span className="text-muted-foreground italic">not logged in</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          Logged via <code>console.log</code> on the server during SSR. Check
          server terminal.
        </p>
      </section>

      <section className="space-y-1 rounded-lg border p-4">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Client (useAuth)
        </h2>
        <p className="font-mono text-sm break-all">
          {userId ?? (
            <span className="text-muted-foreground italic">not logged in</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          Logged via <code>console.log</code> in the browser. Check DevTools
          console.
        </p>
      </section>

      <section className="space-y-2 rounded-lg border p-4">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Server Function
        </h2>
        <p className="text-xs text-muted-foreground">
          Click the button to invoke a server function. Result is logged on the
          server and shown via alert.
        </p>
        <button
          onClick={handleServerFnClick}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Call Server Function
        </button>
      </section>
    </div>
  )
}
