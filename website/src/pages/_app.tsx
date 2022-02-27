import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import { Layout } from '../components/Layout'
import { GlobalStyle } from '../components/GlobalStyle'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider>
      <Layout isExample={router.asPath.startsWith('/examples/')}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
