import { transform, normalizeCode } from '../transform'

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

test('normalize inline JSX', () => {
  expect(
    normalizeCode(`
  
  <>`)
  ).toMatchInlineSnapshot(`
    "
      
      export default <>"
  `)

  expect(
    normalizeCode(`
  
  a<>`)
  ).toMatchInlineSnapshot(`
    "
      
      a<>"
  `)

  expect(
    normalizeCode(`
  
  <a>`)
  ).toMatchInlineSnapshot(`
    "
      
      export default <a>"
  `)
})

test('normalize inline function component', () => {
  expect(
    normalizeCode(`
  
  function`)
  ).toMatchInlineSnapshot(`
    "
      
      function"
  `)

  expect(
    normalizeCode(`
  
  function(`)
  ).toMatchInlineSnapshot(`
    "
      
      export default function("
  `)

  expect(
    normalizeCode(`
  
  function `)
  ).toMatchInlineSnapshot(`
    "
      
      export default function "
  `)

  expect(
    normalizeCode(`
  
  function A`)
  ).toMatchInlineSnapshot(`
    "
      
      export default function A"
  `)

  expect(
    normalizeCode(`
  
  functionA`)
  ).toMatchInlineSnapshot(`
    "
      
      functionA"
  `)
})

test('normalize inline arrow function component', () => {
  expect(
    normalizeCode(`
  
  ()=>`)
  ).toMatchInlineSnapshot(`
    "
      
      export default ()=>"
  `)

  expect(
    normalizeCode(`
  
  () a`)
  ).toMatchInlineSnapshot(`
    "
      
      export default () a"
  `)

  expect(
    normalizeCode(`
  
  (a) `)
  ).toMatchInlineSnapshot(`
    "
      
      (a) "
  `)

  expect(
    normalizeCode(`
  
  ()a`)
  ).toMatchInlineSnapshot(`
    "
      
      ()a"
  `)
})

test('normalize inline class component', () => {
  expect(
    normalizeCode(`
  
  class`)
  ).toMatchInlineSnapshot(`
    "
      
      class"
  `)

  expect(
    normalizeCode(`
  
  classA`)
  ).toMatchInlineSnapshot(`
    "
      
      classA"
  `)

  expect(
    normalizeCode(`
  
  class `)
  ).toMatchInlineSnapshot(`
    "
      
      export default class "
  `)

  expect(
    normalizeCode(`
  
  class A`)
  ).toMatchInlineSnapshot(`
    "
      
      export default class A"
  `)
})
