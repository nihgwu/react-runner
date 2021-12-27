import { createContext, useContext } from 'react'

import { LiveRunnerResult, Language, Theme } from './types'

export type LiveContextProps = LiveRunnerResult & {
  language?: Language
  theme?: Theme
}

/* istanbul ignore next */
export const LiveContext = createContext<LiveContextProps>({
  element: null,
  error: null,
  code: '',
  onChange: () => {},
})

export const useLiveContext = () => useContext(LiveContext)
