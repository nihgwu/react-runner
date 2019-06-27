import { useState, useMemo, useEffect } from 'react'
import { transpile } from './utils'

const useRunner = ({ code, scope, type }) => {
  if (!useState) throw new Error('Require React 16.8 or above to use hooks')

  // memoize scope to avoid effect loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoScope = useMemo(() => scope, [scope && Object.keys(scope).join()])
  const [state, setState] = useState({ element: null, error: null })
  useEffect(() => {
    const { element, error } = transpile(
      { code, scope: memoScope, type },
      error => {
        setState({ error, element: null })
      }
    )
    setState({ element, error })
  }, [code, memoScope, type])

  return state
}

export default useRunner
