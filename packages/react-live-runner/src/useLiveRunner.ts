import { useState, useEffect } from 'react'
import { useRunner, UseRunnerProps, UseRunnerReturn } from 'react-runner'

export type UseLiveRunnerProps = Omit<UseRunnerProps, 'code'> & {
  /** initial code for the live runner */
  initialCode?: string
  /** transform the code before transpiling */
  transformCode?: (code: string) => string
}

export type UseLiveRunnerRetrun = UseRunnerReturn & {
  code: string
  setCode: (value: string) => void
}

export const useLiveRunner = ({
  initialCode = '',
  scope,
  disableCache,
  transformCode,
}: UseLiveRunnerProps): UseLiveRunnerRetrun => {
  const [code, setCode] = useState(initialCode)
  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    scope,
    disableCache,
  })

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  return { element, error, code, setCode }
}
