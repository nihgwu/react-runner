import { useState, useMemo, useEffect } from 'react'
import { compile } from './utils'

const useRunner = ({ code, scope }) => {
  if (!useState) throw new Error('Require React 16.8 or above to use hooks')

  // memoize scope to avoid effect loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoScope = useMemo(() => scope, [scope && Object.keys(scope).join()])
  const [state, setState] = useState({ element: null, error: null })
  useEffect(() => {
    const { element, error } = compile({ code, scope: memoScope }, error => {
      setState({ error, element: null })
    })
    setState({ element, error })
  }, [code, memoScope])

  return state
}

export default useRunner
