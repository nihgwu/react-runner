import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --header-height: 48px;
  }

  html {
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    height: 100%;
    overflow: auto;
  }

  #__next {
    height: 100%;
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
