import { transform as _transform } from 'buble'

const transform = (code, options = {}) => {
  return _transform(code, {
    transforms: {
      dangerousForOf: true,
      dangerousTaggedTemplateString: true,
    },
  }).code
}

export default transform
