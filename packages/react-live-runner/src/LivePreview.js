import React from 'react'
import PropTypes from 'prop-types'

import LiveContext from './LiveContext'

function LivePreview({ Component, ...rest }) {
  return (
    <LiveContext.Consumer>
      {({ element }) => <Component {...rest}>{element}</Component>}
    </LiveContext.Consumer>
  )
}

LivePreview.defaultProps = {
  Component: 'div',
}

LivePreview.propTypes = {
  Component: PropTypes.elementType,
}

export default LivePreview
