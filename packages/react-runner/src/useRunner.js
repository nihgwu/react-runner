import { useState, useEffect } from 'react'
import { generateElement } from './utils'

const useRunner = ({ code, scope, type }) => {
  if (!useState) throw new Error('Require React 16.8 or above to use hooks')

  const [state, setState] = useState({ element: null, error: null })
  useEffect(() => {
    const element = generateElement({ code, scope, type }, error => {
      setState({ error, element: null })
    })
    setState({ element, error: null })
  }, [code, scope, type])

  return state
}

export default useRunner
