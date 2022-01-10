import { transform as _transform } from 'sucrase'

export const transform = (code: string, hasImports?: boolean) => {
  return _transform(code, {
    transforms: hasImports
      ? ['jsx', 'typescript', 'imports']
      : ['jsx', 'typescript'],
    production: true,
    jsxPragma: 'jsxPragma',
    jsxFragmentPragma: 'jsxFragmentPragma',
  }).code
}
