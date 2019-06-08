import React from 'react'
import styled, { css } from 'styled-components'

import Layout from '../components/Layout'
import LiveRunner from '../components/LiveRunner'

const examples = [
  {
    title: 'Inline elements',
    code: `
<div>Hello</div>
<div>react-runner</div>
`,
  },
  {
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
    title: 'Class Component',
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
    {examples.map(({ title, code, scope }) => (
      <React.Fragment key={title}>
        <Title>{title}</Title>
        <LiveRunner code={code} scope={scope} />
      </React.Fragment>
    ))}
  </Layout>
)

export default Page
