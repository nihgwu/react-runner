export type Scope = Record<string, any>

export type RunnerOptions = {
  code: string
  scope?: Scope
}
