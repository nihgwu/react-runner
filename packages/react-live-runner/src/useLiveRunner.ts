import { useState, useEffect, useRef } from 'react'
import { useRunner, RunnerResult } from 'react-runner'

import { LiveRunnerOptions, LiveRunnerResult } from './types'

export const useLiveRunner = ({
  scope,
  sourceCode,
  disableCache,
  transformCode,
}: LiveRunnerOptions): LiveRunnerResult => {
  const elementRef = useRef<RunnerResult['element']>(null)
  const [code, onChange] = useState(sourceCode)
  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    scope,
  })
  if (disableCache || !error) elementRef.current = element

  useEffect(() => {
    onChange(sourceCode)
  }, [sourceCode])

  return { element: elementRef.current, error, code, onChange }
}
