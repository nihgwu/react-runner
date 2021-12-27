import { FC } from 'react'
import Head from 'next/head'
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
  overflow: auto;
`

const Body = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 70px 20px 20px;

  @media (max-width: 600px) {
    padding: 60px 10px 10px;
  }
`

const Layout: FC = ({ children }) => (
  <Container>
    <GlobalStyle />
    <Head>
      <title>react-runner</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Preview your React component the easy way"
      />
      <meta name="keywords" content="react, component, preview, runner, live" />
    </Head>
    <Header />
    <Body>{children}</Body>
  </Container>
)

export default Layout
