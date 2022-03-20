import React, { StrictMode } from 'react'
import ReactDOMServer from 'react-dom/server'

import './index.css'
import App from './App'

export const render = () =>
  ReactDOMServer.renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
