import type { DataModel } from '../_generated/dataModel'
import { createBuilder } from 'fluent-convex'
import { WithZod } from 'fluent-convex/zod'

export const convex = createBuilder<DataModel>()

export const convexQuery = convex.query().extend(WithZod)

export const convexMutation = convex.mutation().extend(WithZod)

export const convexAction = convex.action().extend(WithZod)
