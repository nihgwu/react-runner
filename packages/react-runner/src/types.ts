import { ReactElement } from 'react'

export type Scope = Record<string, any>

export type RunnerOptions = {
  code: string
  scope?: Scope
}

export type RunnerResult = {
  element: ReactElement | null
  error: string | null
}

export type ErrorCallback = (error: string) => void
