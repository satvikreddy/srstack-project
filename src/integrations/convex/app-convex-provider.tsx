import { ConvexProvider } from 'convex/react'
import { convexReact } from './convex'

export function AppConvexProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convexReact}>{children}</ConvexProvider>
}
