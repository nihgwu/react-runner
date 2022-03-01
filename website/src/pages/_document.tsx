import { Html, Head, Main, NextScript } from 'next/document'

import { resetCounter } from '../constants'

export default function Document() {
  // reset counter for SSR
  resetCounter()
  return (
    <Html lang="en" data-theme="system">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
