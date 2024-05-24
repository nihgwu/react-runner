import { transformSync as _transform } from '@swc/wasm-web/wasm-web'
// import { transform as _transform1 } from 'sucrase'

const config: any = {
  jsc: {
    parser: {
      syntax: 'typescript',
      tsx: true,
    },
    target: 'es5',
    loose: false,
    minify: {
      compress: false,
      mangle: false,
    },
  },
  module: {
    type: 'commonjs',
  },
  minify: false,
  isModule: true,
}

export const transform = (code: string) => {
  return _transform(code, config).code.substring(13) // remove leading `"use strict";`
}

const firstStatementRegexp =
  /^(\s*)(<[^>]*>|function[(\s]|\(\)[\s=]|class\s)(.*)/

export const normalizeCode = (code: string) => {
  return code.replace(firstStatementRegexp, '$1export default $2$3')
}
