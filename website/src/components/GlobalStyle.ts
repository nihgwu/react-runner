import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 48px;
  }

  [data-theme='dark'] [data-hide='dark'],
  [data-theme='light'] [data-hide='light'] {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    [data-theme='system'] [data-hide='dark'] {
      display: none;
    }
  }

  @media (prefers-color-scheme: light) {
    [data-theme='system'] [data-hide='light'] {
      display: none;
    }
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }

  pre, code, kbd {
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
  }

  ul {
    list-style: auto inside;
    padding: 0;
  }

  a {
    color: steelblue;
    text-decoration: none;
  }
`
