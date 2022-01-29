import { transform } from '../transform'

test('react component', () => {
  const result = transform(`<div>react-runner</div>`)
  expect(result).toMatchInlineSnapshot(
    `"React.createElement('div', null, \\"react-runner\\")"`
  )
})

test('react component', () => {
  const result = transform(`() => <div>react-runner</div>`)
  expect(result).toMatchInlineSnapshot(
    `"() => React.createElement('div', null, \\"react-runner\\")"`
  )
})

test('react component with typescript', () => {
  const result = transform(
    `(props: { foo?: number }) => <div>react-runner</div>`
  )
  expect(result).toMatchInlineSnapshot(
    `"(props) => React.createElement('div', null, \\"react-runner\\")"`
  )
})

test('imports', () => {
  const code = `import { useState, useEffect } from 'react'
    import styled from 'styled-components'
    
    const Button = styled.button\`
      color: steelblue;
    \`
    
    render(<Button>Click me</Button>)`

  expect(transform(code)).toMatchInlineSnapshot(`
    " function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
        var _styledcomponents = require('styled-components'); var _styledcomponents2 = _interopRequireDefault(_styledcomponents);
        
        const Button = _styledcomponents2.default.button\`
          color: steelblue;
        \`
        
        render(React.createElement(Button, null, \\"Click me\\" ))"
  `)
})
