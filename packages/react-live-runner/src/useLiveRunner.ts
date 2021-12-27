import { useState, useEffect } from 'react'
import { useRunner } from 'react-runner'

import { LiveRunnerOptions } from './types'

export const useLiveRunner = ({
  sourceCode,
  scope,
  transformCode,
}: LiveRunnerOptions) => {
  const [code, onChange] = useState(sourceCode)
  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    scope,
  })

  useEffect(() => {
    onChange(sourceCode)
  }, [sourceCode])

  return { element, error, code, onChange }
}
