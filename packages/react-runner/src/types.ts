export type Scope = Record<string, any>

export type RunnerOptions = {
  /** the code to run */
  code: string
  /** globals that could be used in code */
  scope?: Scope
  /** imports that could be used in code */
  imports?: Scope
}
