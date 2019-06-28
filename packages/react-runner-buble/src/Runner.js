import React from 'react'
import PropTypes from 'prop-types'

import { transpile } from './utils'

export default class Runner extends React.Component {
  state = {
    error: null,
    element: null,
  }

  transpile = () => {
    const { code, scope } = this.props

    const { element, error } = transpile({ code, scope }, error => {
      this.setState({ error, element: null })
    })
    this.setState({ element, error })
  }

  componentDidMount() {
    this.transpile()
  }

  componentDidUpdate(prevProps) {
    const { code, scope } = this.props
    if (code !== prevProps.code || scope !== prevProps.scope) {
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
}
