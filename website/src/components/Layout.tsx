import { FC } from 'react'
import Head from 'next/head'

import { Header } from './Header'
import { BackButton } from './BackButton'

type LayoutProps = {
  isExample?: boolean
}

export const Layout: FC<LayoutProps> = ({ children, isExample }) => (
  <>
    <Head>
      <title>React Runner</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Preview your React component the easy way"
      />
      <meta name="keywords" content="react, component, preview, runner, live" />
    </Head>
    {isExample ? <BackButton /> : <Header />}
    {children}
  </>
)
