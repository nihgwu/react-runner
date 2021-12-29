import { RunnerOptions, RunnerResult } from 'react-runner'
import { Language, PrismTheme } from 'prism-react-renderer'

export type Theme = PrismTheme
export type { Language }

export type LiveRunnerOptions = Omit<RunnerOptions, 'code'> & {
  sourceCode: string
  disableCache?: boolean
  transformCode?: (code: string) => string
}

export type LiveRunnerResult = RunnerResult & {
  code: string
  onChange: (value: string) => void
}
