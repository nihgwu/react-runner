import React from 'react'
import LiveContext from './LiveContext'

export default function LiveError(props) {
  return (
    <LiveContext.Consumer>
      {({ error }) => (error ? <pre {...props}>{error.toString()}</pre> : null)}
    </LiveContext.Consumer>
  )
}
