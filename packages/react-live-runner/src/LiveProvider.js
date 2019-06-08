import React from 'react'
import PropTypes from 'prop-types'

import LiveContext from './LiveContext'
import LiveRunner from './LiveRunner'

export default function LiveProvider(props) {
  const { children, code, scope, type, language, theme, transformCode } = props
  return (
    <LiveRunner code={transformCode(code)} scope={scope} type={type}>
      {({ element, error, code, onChange }) => (
        <LiveContext.Provider
          value={{ element, error, code, language, type, theme, onChange }}
        >
          {children}
        </LiveContext.Provider>
      )}
    </LiveRunner>
  )
}

LiveProvider.defaultProps = {
  code: '',
  language: 'jsx',
  transformCode: code => code,
}

LiveProvider.propTypes = {
  children: PropTypes.node,
  code: PropTypes.string,
  scope: PropTypes.object,
  type: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.object,
  transformCode: PropTypes.func,
}
