import React from 'react'
import PropTypes from 'prop-types'

import LiveContext from './LiveContext'

function LivePreview({ Component, ...rest }) {
  return (
    <Component {...rest}>
      <LiveContext.Consumer>{({ element }) => element}</LiveContext.Consumer>
    </Component>
  )
}

LivePreview.defaultProps = {
  Component: 'div',
}

LivePreview.propTypes = {
  Component: PropTypes.elementType,
}

export default LivePreview
