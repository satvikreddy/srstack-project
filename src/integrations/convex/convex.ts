import { ConvexHttpClient } from 'convex/browser'
import { ConvexReactClient } from 'convex/react'

const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!convexUrl) {
  console.warn(
    'VITE_CONVEX_URL is not set. Please set it in your .env file or environment variables.',
  )
}

export const convexReact = new ConvexReactClient(convexUrl)

export const convexHttp = new ConvexHttpClient(convexUrl)
