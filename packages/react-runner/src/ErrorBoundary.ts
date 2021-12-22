import { Component } from 'react'

type ErrorBoundaryProps = {
  onError?: (error: string) => void
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error.toString())
  }

  render() {
    if (this.state.hasError) return null

    return this.props.children
  }
}
