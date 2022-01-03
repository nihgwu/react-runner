import type { AppProps } from 'next/app'

import { Layout } from '../components/Layout'
import { GlobalStyle } from '../components/GlobalStyle'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout isExample={router.asPath.startsWith('/examples/')}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
