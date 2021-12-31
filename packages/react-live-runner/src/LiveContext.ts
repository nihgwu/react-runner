import { createContext, useContext } from 'react'

import { UseLiveRunnerRetrun } from './useLiveRunner'
import { Language, Theme } from './types'

export type LiveContextProps = UseLiveRunnerRetrun & {
  language?: Language
  theme?: Theme
}

export const LiveContext = createContext<LiveContextProps>(
  {} as LiveContextProps
)

export const useLiveContext = () => useContext(LiveContext)
