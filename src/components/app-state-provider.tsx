import { create } from 'zustand'
import { getNavConfig, NavConfig } from '@/features/navigation/nav-config'

type AppState = {
  navConfig: NavConfig
}

export const useAppState = create<AppState>((set, get) => ({
  navConfig: getNavConfig(),
}))
