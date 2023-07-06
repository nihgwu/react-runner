import { useState, useRef, useEffect, createElement, ReactElement } from 'react'

import { Runner } from './Runner'
import { RunnerOptions } from './types'

import init from '@swc/wasm-web/wasm-web'

export type UseRunnerProps = RunnerOptions & {
  /** whether to cache previous element when error occurs with current code */
  disableCache?: boolean
}

export type UseRunnerReturn = {
  element: ReactElement | null
  error: string | null
}

export const useRunner = ({
  code,
  scope,
  disableCache,
}: UseRunnerProps): UseRunnerReturn => {
  const isMountRef = useRef(true)
  const elementRef = useRef<ReactElement | null>(null)
  const [readied, setReadied] = useState(false)

  const [state, setState] = useState<UseRunnerReturn>(() => {
    return { element: null, error: null }
  })
  useEffect(() => {
    init().then(() => {
      setReadied(true)
    })
  }, [])

  useEffect(() => {
    if (isMountRef.current) {
      isMountRef.current = false
      return
    }
    if (!readied) {
      return
    }
    console.log(readied, 'readied')
    const element = createElement(Runner, {
      code,
      scope,
      onRendered: (error) => {
        if (error) {
          setState({
            element: disableCache ? null : elementRef.current,
            error: error.toString(),
          })
        } else {
          elementRef.current = element
        }
      },
    })
    setState({ element, error: null })
  }, [code, scope, disableCache, readied])

  return state
}
