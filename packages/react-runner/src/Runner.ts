import { Component, ReactElement } from 'react'

import { generateElement } from './utils'
import { RunnerOptions } from './types'

export type RunnerProps = RunnerOptions & {
  onRendered?: (error?: string) => void
}

type RunnerState = {
  element: ReactElement | null
  error: string | null
  prevCode: string | null
}

export class Runner extends Component<RunnerProps, RunnerState> {
  state: RunnerState = {
    element: null,
    error: null,
    prevCode: null,
  }

  static getDerivedStateFromProps(
    props: RunnerProps,
    state: RunnerState
  ): Partial<RunnerState> | null {
    // only regenerate on code change
    if (state.prevCode === props.code) return null
    try {
      return {
        element: generateElement(props),
        error:
          state.error && props.code !== state.prevCode ? null : state.error,
        prevCode: props.code,
      }
    } catch (error: unknown) {
      return {
        element: null,
        error: (error as Error).toString(),
        prevCode: props.code,
      }
    }
  }

  static getDerivedStateFromError(error: Error): Partial<RunnerState> {
    return { error: error.toString() }
  }

  componentDidMount() {
    this.props.onRendered?.(this.state.error?.toString())
  }

  shouldComponentUpdate(nextProps: RunnerProps) {
    return nextProps.code !== this.props.code
  }

  componentDidUpdate() {
    this.props.onRendered?.(this.state.error?.toString())
  }

  render() {
    return this.state.error ? null : this.state.element
  }
}
