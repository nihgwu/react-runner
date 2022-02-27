import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    overflow: hidden;
    --header-height: 48px;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    width: 100vw;
    height: 100vh;
    overflow: auto;
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
