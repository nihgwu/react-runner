import { Component, ReactElement } from 'react'

import { compile } from './utils'
import { RunnerOptions, RunnerResult } from './types'

export type RunnerProps = RunnerOptions & {
  children: (state: RunnerResult) => ReactElement | null
}

export class Runner extends Component<RunnerProps, RunnerResult> {
  state: RunnerResult = {
    error: null,
    element: null,
  }

  compile = () => {
    const { code, scope } = this.props

    const { element, error } = compile({ code, scope }, (error) => {
      this.setState({ error, element: null })
    })
    this.setState({ element, error })
  }

  componentDidMount() {
    this.compile()
  }

  componentDidUpdate(prevProps: RunnerProps) {
    if (this.props.code !== prevProps.code) {
      this.compile()
    }
  }

  render() {
    return this.props.children(this.state)
  }
}
