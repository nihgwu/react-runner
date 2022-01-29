import { transform as _transform } from 'sucrase'

export const transform = (code: string) => {
  return _transform(code, {
    transforms: ['jsx', 'typescript', 'imports'],
    production: true,
    jsxPragma: 'jsxPragma',
    jsxFragmentPragma: 'jsxFragmentPragma',
  }).code.substring(13) // remove leading `"use strict";`
}
