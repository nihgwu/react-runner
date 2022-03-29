import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

ReactDOM.hydrate(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app-root')
)
