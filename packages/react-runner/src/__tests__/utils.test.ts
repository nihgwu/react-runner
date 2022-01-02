import { create } from 'react-test-renderer'

import { generateElement } from '../utils'

test('inline elements', () => {
  const element = generateElement({
    code: `
    <div>Hello</div>
    <div>react-runner</div>
    `,
  })

  expect(element).toMatchInlineSnapshot(`
    <React.Fragment>
      <div>
        Hello
      </div>
      <div>
        react-runner
      </div>
    </React.Fragment>
  `)
})

test('function component', () => {
  const element = generateElement({
    code: `
    function Counter() {
      const [count, setCount] = React.useState(0)

      return (
        <>
          <div>{count}</div>
          <button onClick={() => setCount(count => count + 1)}>+</button>
          <button onClick={() => setCount(count => count - 1)}>-</button>
        </>
      )
    }
    `,
  })

  expect(element).toMatchInlineSnapshot(`<Counter />`)
  expect(create(element!)).toMatchInlineSnapshot(`
    Array [
      <div>
        0
      </div>,
      <button
        onClick={[Function]}
      >
        +
      </button>,
      <button
        onClick={[Function]}
      >
        -
      </button>,
    ]
  `)
})

test('class component', () => {
  const element = generateElement({
    code: `
    class Counter extends React.Component {
      state = {
        count: 0,
      }

      onIncrement = () => {
        this.setState(({ count }) => ({
          count: count + 1,
        }))
      }

      onDecrement = () => {
        this.setState(({ count }) => ({
          count: count - 1,
        }))
      }

      render() {
        return (
          <>
            <div>{this.state.count}</div>
            <button onClick={this.onIncrement}>+</button>
            <button onClick={this.onDecrement}>-</button>
          </>
        )
      }
    }
    `,
  })

  expect(element).toMatchInlineSnapshot(`<Counter />`)
  expect(create(element!)).toMatchInlineSnapshot(`
    Array [
      <div>
        0
      </div>,
      <button
        onClick={[Function]}
      >
        +
      </button>,
      <button
        onClick={[Function]}
      >
        -
      </button>,
    ]
  `)
})

test('export default', () => {
  const element = generateElement({
    // indent is important for regexp match
    code: `
const value = 'react-runner'

export default () => (
  <>
    <div>Hello</div>
    <div>{value}</div>
  </>
)
    `,
  })

  expect(element).toMatchInlineSnapshot(`<Unknown />`)
  expect(create(element!)).toMatchInlineSnapshot(`
    Array [
      <div>
        Hello
      </div>,
      <div>
        react-runner
      </div>,
    ]
  `)
})

test('render', () => {
  const element = generateElement({
    // indent is important for regexp match
    code: `
const value = 'react-runner'

render(
  <>
    <div>Hello</div>
    <div>{value}</div>
  </>
)
    `,
  })

  expect(element).toMatchInlineSnapshot(`
    <React.Fragment>
      <div>
        Hello
      </div>
      <div>
        react-runner
      </div>
    </React.Fragment>
  `)
})

test('scope', () => {
  const element = generateElement({
    code: `
    <div>{value}</div>
    <div>react-runner</div>
    `,
    scope: { value: 'Hello' },
  })

  expect(element).toMatchInlineSnapshot(`
    <React.Fragment>
      <div>
        Hello
      </div>
      <div>
        react-runner
      </div>
    </React.Fragment>
  `)
})

test('string', () => {
  const element = generateElement({ code: `"hello"` })
  expect(element).toMatchInlineSnapshot(`
    <React.Fragment>
      hello
    </React.Fragment>
  `)
})

test('empty code', () => {
  const element = generateElement({ code: `` })
  expect(element).toBeNull()
})

test('console', () => {
  const element = generateElement({ code: `console` })
  expect(element).toBeNull()
})

test('console.log', () => {
  const element = generateElement({ code: `console.log('react-runner')` })
  expect(element).toBeNull()
})

test('invalid code', () => {
  expect(() =>
    generateElement({
      code: `
      <div>{value}</div>
      <div>react-runner</div>
      `,
    })
  ).toThrowError(new ReferenceError('value is not defined'))
})
