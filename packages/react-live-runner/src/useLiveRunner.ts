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
  onChange: (value: string) => void
}

export const useLiveRunner = ({
  initialCode = '',
  transformCode,
  ...rest
}: UseLiveRunnerProps): UseLiveRunnerRetrun => {
  const [code, onChange] = useState(initialCode)
  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    ...rest,
  })

  useEffect(() => {
    onChange(initialCode)
  }, [initialCode])

  return { element, error, code, onChange }
}
