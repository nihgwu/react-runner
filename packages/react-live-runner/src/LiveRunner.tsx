import React, { ReactElement } from 'react'
import { Runner, RunnerResult } from 'react-runner'

import { LiveRunnerOptions, LiveRunnerResult } from './types'

export interface LiveRunnerProps extends LiveRunnerOptions {
  children: (props: LiveRunnerResult) => ReactElement | null
}

type LiveRunnerState = {
  code: string
  sourceCode: string
}

export class LiveRunner extends React.Component<
  LiveRunnerProps,
  LiveRunnerState
> {
  state: LiveRunnerState = {
    code: this.props.sourceCode,
    sourceCode: this.props.sourceCode,
  }

  element: RunnerResult['element'] = null

  static getDerivedStateFromProps(
    props: LiveRunnerProps,
    state: LiveRunnerState
  ): Partial<LiveRunnerState> | null {
    if (props.sourceCode !== state.sourceCode) {
      return {
        code: props.sourceCode,
        sourceCode: props.sourceCode,
      }
    }

    return null
  }

  handleChange = (code: string) => {
    this.setState({ code })
  }

  render() {
    const { children, scope, disableCache, transformCode } = this.props
    const { code } = this.state

    return (
      <Runner code={transformCode ? transformCode(code) : code} scope={scope}>
        {({ element, error }) => {
          if (disableCache || !error) this.element = element
          return children({
            element: this.element,
            error,
            code,
            onChange: this.handleChange,
          })
        }}
      </Runner>
    )
  }
}
