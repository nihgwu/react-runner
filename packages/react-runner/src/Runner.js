import React from 'react'
import PropTypes from 'prop-types'

import { generateElement } from './utils'

export default class Runner extends React.Component {
  state = {
    error: null,
    element: null,
  }

  transpile = () => {
    const { code, scope, type } = this.props
    const element = generateElement({ code, scope, type }, error => {
      this.setState({ error, element: null })
    })
    this.setState({ element, error: null })
  }

  componentDidMount() {
    this.transpile()
  }

  componentDidUpdate(prevProps) {
    const { code, scope, type } = this.props
    if (
      code !== prevProps.code ||
      scope !== prevProps.scope ||
      type !== prevProps.type
    ) {
      this.transpile()
    }
  }

  render() {
    const { children } = this.props
    const { element, error } = this.state

    return children({
      element,
      error,
    })
  }
}

Runner.propTypes = {
  children: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  scope: PropTypes.object,
  type: PropTypes.oneOf(['typescript', 'flow']),
}
