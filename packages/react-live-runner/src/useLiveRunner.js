import { useState, useEffect } from 'react'
import { useRunner } from 'react-runner'

const useLiveRunner = ({ sourceCode, scope, type }) => {
  const [code, onChange] = useState(sourceCode)
  const { element, error } = useRunner({ code, scope, type })

  useEffect(() => {
    onChange(sourceCode)
  }, [sourceCode])

  return { element, error, code, onChange }
}

export default useLiveRunner
