import { FC } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { Header } from './Header'

const Body = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px 16px;
`

export const Layout: FC = ({ children }) => (
  <>
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
  </>
)
