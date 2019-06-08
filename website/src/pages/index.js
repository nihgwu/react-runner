import React from 'react'
import styled, { css } from 'styled-components'

import Layout from '../components/Layout'
import LiveRunner from '../components/LiveRunner'

const examples = [
  {
    key: 'inline-elements',
    title: 'Inline elements',
    code: `
<div>Hello</div>
<div>react-runner</div>
`,
  },
  {
    key: 'function-component',
    title: 'Function Component',
    code: `
() => {
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
  },
  {
    key: 'class-component',
    title: 'Class Component with fields support',
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
  },
  {
    key: 'export-default',
    title: 'export default Component',
    scope: { styled, css },
    code: `
const Counter = () => {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>-</button>
    </>
  )
}

export default Counter
`,
  },
  {
    key: 'render',
    title: 'render(<Component />)',
    scope: { styled, css },
    code: `
const Button = styled.button\`
  background: transparent;
  color: steelblue;
  border: 2px solid steelblue;
  margin: 5px 10px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 4px;

  \${props => props.primary && css\`
    background: steelblue;
    color: white;
  \`}
\`

render(
  <>
    <Button>Normal Button</Button>
    <Button primary>Primary Button</Button>
  </>
)
`,
  },
]

const Title = styled.h3`
  color: steelblue;
`

const Page = () => (
  <Layout>
    {examples.map(({ key, title, code, scope }) => (
      <React.Fragment key={key}>
        <Title id={key}>{title}</Title>
        <LiveRunner code={code} scope={scope} />
      </React.Fragment>
    ))}
  </Layout>
)

export default Page
