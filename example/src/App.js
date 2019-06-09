import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './components/Header'
import LiveRunner from './components/LiveRunner'
import examples from './examples'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
`

const Content = styled.div`
  margin: 20px auto;
  max-width: 900px;
`

const Title = styled.h3`
  color: steelblue;
`

const App = () => (
  <Container>
    <GlobalStyle />
    <Header />
    <Body>
      <Content>
        {examples.map(({ key, title, code, scope }) => (
          <React.Fragment key={key}>
            <Title id={key}>{title}</Title>
            <LiveRunner code={code} scope={scope} />
          </React.Fragment>
        ))}
      </Content>
    </Body>
  </Container>
)

export default App
