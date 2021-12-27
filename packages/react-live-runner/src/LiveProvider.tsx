import React, { FC } from 'react'

import { LiveContext } from './LiveContext'
import { useLiveRunner } from './useLiveRunner'
import { LiveRunnerOptions, Language, Theme } from './types'
import defaultTheme from './defaultTheme'

export type LiveProviderProps = Omit<LiveRunnerOptions, 'sourceCode'> & {
  code?: string
  language?: Language
  theme?: Theme
}

export const LiveProvider: FC<LiveProviderProps> = ({
  children,
  code: sourceCode = '',
  scope,
  language = 'jsx',
  theme = defaultTheme,
  transformCode,
}) => {
  const { element, error, code, onChange } = useLiveRunner({
    sourceCode,
    scope,
    transformCode,
  })

  return (
    <LiveContext.Provider
      value={{ element, error, code, onChange, language, theme }}
    >
      {children}
    </LiveContext.Provider>
  )
}
