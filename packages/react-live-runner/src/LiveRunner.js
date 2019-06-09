import React from 'react'
import PropTypes from 'prop-types'
import Runner from 'react-runner'

export default class LiveRunner extends React.Component {
  state = this.getState()

  getState() {
    const { sourceCode } = this.props

    return {
      code: sourceCode ? sourceCode.trim() : '',
    }
  }

  handleChange = code => {
    this.setState({ code })
  }

  componentDidUpdate(prevProps) {
    if (this.props.sourceCode !== prevProps.sourceCode) {
      this.setState(this.getState())
    }
  }

  render() {
    const { children, scope, type } = this.props
    const { code } = this.state
    return (
      <Runner code={code} scope={scope} type={type}>
        {({ element, error }) =>
          children({
            element,
            error,
            code,
            onChange: this.handleChange,
          })
        }
      </Runner>
    )
  }
}

LiveRunner.propTypes = {
  children: PropTypes.func.isRequired,
  sourceCode: PropTypes.string.isRequired,
  scope: PropTypes.object,
  type: PropTypes.oneOf(['typescript', 'flow']),
}
