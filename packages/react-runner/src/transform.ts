import { transform as _transform } from 'sucrase'

export const transform = (code: string) => {
  return _transform(code, {
    transforms: ['jsx', 'typescript', 'imports'],
    production: true,
  }).code
}
