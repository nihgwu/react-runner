import { create } from 'react-test-renderer'

import { compile } from '../utils'

test('inline elements', () => {
  const { element, error } = compile({
    code: `
  <div>Hello</div>
  <div>react-runner</div>
  `,
  })

  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary>
      <React.Fragment>
        <div>
          Hello
        </div>
        <div>
          react-runner
        </div>
      </React.Fragment>
    </ErrorBoundary>
  `)
})

test('function component', () => {
  const { element, error } = compile({
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

  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary>
      <Counter />
    </ErrorBoundary>
  `)
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
  const { element, error } = compile({
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
        <div>
          <div>{this.state.count}</div>
          <button onClick={this.onIncrement}>+</button>
          <button onClick={this.onDecrement}>-</button>
        </div>
      )
    }
  }
  `,
  })

  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary>
      <Counter />
    </ErrorBoundary>
  `)
})

test('export default', () => {
  const { element, error } = compile({
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

  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary>
      <Unknown />
    </ErrorBoundary>
  `)
})

test('render', () => {
  const { element, error } = compile({
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

  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary>
      <React.Fragment>
        <div>
          Hello
        </div>
        <div>
          react-runner
        </div>
      </React.Fragment>
    </ErrorBoundary>
  `)
})

test('scope', () => {
  const { element, error } = compile({
    code: `
  <div>{value}</div>
  <div>react-runner</div>
  `,
    scope: { value: 'Hello' },
  })

  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary>
      <React.Fragment>
        <div>
          Hello
        </div>
        <div>
          react-runner
        </div>
      </React.Fragment>
    </ErrorBoundary>
  `)
})

test('empty code', () => {
  const { element, error } = compile({ code: `` })
  expect(error).toBeNull()
  expect(element).toBeNull()
})

test('console', () => {
  const { element, error } = compile({ code: `console` })
  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary>
      [object console]
    </ErrorBoundary>
  `)
})

test('console.log', () => {
  const { element, error } = compile({ code: `console.log('react-runner')` })
  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`<ErrorBoundary />`)
})

test('invalid code', () => {
  const { element, error } = compile({
    code: `
  <div>{value}</div>
  <div>react-runner</div>
  `,
  })

  expect(error).toBe('ReferenceError: value is not defined')
  expect(element).toBeNull()
})

test('error boundary', () => {
  const onError = jest.fn()
  const { element, error } = compile(
    {
      code: `
      function Counter() {
        const [count, setCount] = React.useState1(0)
  
        return (
          <>
            <div>{count}</div>
            <button onClick={() => setCount(count => count + 1)}>+</button>
            <button onClick={() => setCount(count => count - 1)}>-</button>
          </>
        )
      }
    `,
    },
    onError
  )

  //expect(error).toBe('ReferenceError: value is not defined')
  expect(error).toBeNull()
  expect(element).toMatchInlineSnapshot(`
    <ErrorBoundary
      onError={[MockFunction]}
    >
      <Counter />
    </ErrorBoundary>
  `)

  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  expect(create(element!)).toMatchInlineSnapshot(`null`)
  expect(onError).toHaveBeenCalledWith(
    'TypeError: React.useState1 is not a function or its return value is not iterable'
  )
  spy.mockRestore()
})
