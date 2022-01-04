import React, { FC } from 'react'

import { LiveContext } from './LiveContext'
import { useLiveRunner, UseLiveRunnerProps } from './useLiveRunner'
import { Language, Theme } from './types'
import defaultTheme from './defaultTheme'

export type LiveProviderProps = Omit<UseLiveRunnerProps, 'initialCode'> & {
  code?: string
  language?: Language
  theme?: Theme
}

export const LiveProvider: FC<LiveProviderProps> = ({
  children,
  scope,
  code: initialCode = '',
  language = 'jsx',
  theme = defaultTheme,
  disableCache,
  transformCode,
}) => {
  const { element, error, code, onChange } = useLiveRunner({
    scope,
    initialCode,
    disableCache,
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
