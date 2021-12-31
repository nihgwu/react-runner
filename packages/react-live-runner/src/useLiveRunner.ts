import { useState, useEffect } from 'react'
import { useRunner, UseRunnerProps, UseRunnerReturn } from 'react-runner'

export type UseLiveRunnerProps = Omit<UseRunnerProps, 'code'> & {
  sourceCode: string
  transformCode?: (code: string) => string
}

export type UseLiveRunnerRetrun = UseRunnerReturn & {
  code: string
  onChange: (value: string) => void
}

export const useLiveRunner = ({
  scope,
  sourceCode,
  disableCache,
  transformCode,
}: UseLiveRunnerProps): UseLiveRunnerRetrun => {
  const [code, onChange] = useState(sourceCode)
  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    scope,
    disableCache,
  })

  useEffect(() => {
    onChange(sourceCode)
  }, [sourceCode])

  return { element, error, code, onChange }
}
