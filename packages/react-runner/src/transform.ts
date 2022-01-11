import { transform as _transform } from 'sucrase'

export const transform = (code: string, transformImports?: boolean) => {
  return _transform(code, {
    transforms: transformImports
      ? ['jsx', 'typescript', 'imports']
      : ['jsx', 'typescript'],
    production: true,
    jsxPragma: 'jsxPragma',
    jsxFragmentPragma: 'jsxFragmentPragma',
  }).code
}
