import { useState, useRef, useEffect } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { Runner } from 'react-runner'

const Button = styled.button`
  color: white;
  background-color: steelblue;
`

export default function Counter() {
  const [error, setError] = useState('')
  const divRef = useRef(null)

  useEffect(() => {
    // have to use ReactDom.render to render styled button
    // as it's using another version of React from CDN
    // while Runner doesn't need that as it doesn't use hooks
    ReactDom.render(
      <>
        <Button>Styled button</Button>
      </>,
      divRef.current
    )
  }, [])
  return (
    <>
      <div ref={divRef}></div>
      <Runner
        code={`<div>Hello React Runner</div>`}
        onRendered={(error) => setError(error)}
      />
      <pre>{error}</pre>
    </>
  )
}
