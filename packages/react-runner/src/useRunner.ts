import { useState, useRef, useEffect } from 'react'
import { compile } from './utils'
import { RunnerOptions, RunnerResult } from './types'

export const useRunner = ({ code, scope }: RunnerOptions) => {
  const [state, setState] = useState<RunnerResult>({
    element: null,
    error: null,
  })

  const scopeRef = useRef(scope)
  scopeRef.current = scope

  useEffect(() => {
    const { element, error } = compile(
      { code, scope: scopeRef.current },
      (error) => {
        setState({ error, element: null })
      }
    )
    setState({ element, error })
  }, [code])

  return state
}
