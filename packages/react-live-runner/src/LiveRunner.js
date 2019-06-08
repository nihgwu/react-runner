import React from 'react'
import PropTypes from 'prop-types'
import Runner from 'react-runner'

export default class LiveRunner extends React.Component {
  state = {
    code: this.props.code,
  }

  handleChange = code => {
    this.setState({ code })
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
  code: PropTypes.string.isRequired,
  scope: PropTypes.object,
  type: PropTypes.oneOf(['typescript', 'flow']),
}
