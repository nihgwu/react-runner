import React, { FC } from 'react'

import { LiveContext } from './LiveContext'
import { useLiveRunner, UseLiveRunnerProps } from './useLiveRunner'
import { Language, Theme } from './types'
import defaultTheme from './defaultTheme'

export type LiveProviderProps = Omit<UseLiveRunnerProps, 'initialCode'> & {
  /** initial code for the live runner */
  code?: string
  /** language for syntax highlighting */
  language?: Language
  /** `prism-react-renderer` theme object */
  theme?: Theme
}

export const LiveProvider: FC<LiveProviderProps> = ({
  children,
  code: initialCode = '',
  language = 'jsx',
  theme = defaultTheme,
  ...rest
}) => {
  const { element, error, code, onChange } = useLiveRunner({
    initialCode,
    ...rest,
  })

  return (
    <LiveContext.Provider
      value={{ element, error, code, onChange, language, theme }}
    >
      {children}
    </LiveContext.Provider>
  )
}
