import React from 'react'
import { createRequire } from 'react-live-runner'
import styled, { css, keyframes, createGlobalStyle } from 'styled-components'
import * as Styled from 'styled-components'
import { codeBlock } from 'common-tags'
// @ts-ignore
import hn from '!!raw-loader!./pages/examples/hacker-news.tsx'

export const imports = { react: React, 'styled-components': Styled }
export const scope = {
  ...React,
  styled,
  css,
  keyframes,
  createGlobalStyle,
}

export const examples = [
  {
    key: 'inline-element',
    title: 'Inline element',
    code: codeBlock`
    <>
      <h2>React Runner</h2>
      <ul>
        <li>Inline element</li>
        <li>Function component</li>
        <li>
          Class component, <b>with class fields support</b>
        </li>
        <li>
          Composing components with <b>render</b> or <b>export default</b>
        </li>
        <li>
          Support <b>Typescript</b>
        </li>
        <li>Server Side Rendering</li>
        <li><a href="#multi-files">Multi files</a></li>
      </ul>
      <div>
        <span>Hacker News </span>
        <a href="#hacker-news">in react-runner</a>
        <span> vs </span>
        <a href="examples/hacker-news">in real world</a>
      </div>
    </>
    `,
  },
  {
    key: 'function-component',
    title: 'Function Component',
    code: codeBlock`
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
  },
  {
    key: 'class-component',
    title: 'Class Component with fields support',
    code: codeBlock`
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
    code: codeBlock`
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

    export default () => (
      <>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </>
    )
    `,
  },
  {
    key: 'render',
    title: 'render(<Component />)',
    code: codeBlock`
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
  {
    key: 'hacker-news',
    title: 'Hacker News (Typescript)',
    code: hn,
  },
]
