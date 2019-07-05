import { transform as _transform } from 'sucrase'

const transform = (code, options = {}) => {
  const { type } = options

  return _transform(code, {
    transforms: [
      'jsx',
      type === 'typescript' && 'typescript',
      type === 'flow' && 'flow',
    ].filter(Boolean),
    production: true,
  }).code
}

export default transform
