import React from 'react'
import Helmet from 'react-helmet'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }

  pre, code, kbd {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
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

const Layout = ({ children }) => (
  <Container>
    <GlobalStyle />
    <Helmet
      title="react-runner"
      meta={[
        {
          name: 'description',
          content: 'Preview your React component the easy way',
        },
        {
          name: 'keywords',
          content: 'react, component, preview, runner, live',
        },
      ]}
    />
    <Header />
    <Body>
      <Content>{children}</Content>
    </Body>
  </Container>
)

export default Layout
