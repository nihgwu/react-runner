import { transform as _transform } from 'sucrase-esm'

export const transform = (code: string) => {
  return _transform(code, {
    transforms: ['jsx', 'typescript', 'imports'],
    production: true,
  }).code.substring(13) // remove leading `"use strict";`
}

const firstStatementRegexp =
  /^(\s*)(<[^>]*>|function[\(\s]|\(\)[\s=]|class\s)(.*)/

export const normalizeCode = (code: string) => {
  return code.replace(firstStatementRegexp, '$1export default $2$3')
}
