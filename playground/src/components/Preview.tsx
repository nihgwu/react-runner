import React from 'react'
import ReactDom from 'react-dom'

import { useAsyncRunner } from '../hooks/useAsyncRunner'
import styles from './Preview.module.css'

if (typeof window !== 'undefined') {
  // @ts-expect-error
  window.process = { env: {} }
}

const baseScope = {
  import: {
    react: React,
    'react-dom': {
      ...ReactDom,
      render: (element: Parameters<typeof ReactDom.render>[0]) =>
        ReactDom.render(
          element,
          document.getElementById('root')
        ),
    },
  },
}

export const Preview = ({ files }: { files: Record<string, string> }) => {
  const { element, styleSheets, error, isLoading } = useAsyncRunner({
    files,
    scope: baseScope,
  })

  if (typeof document !== 'undefined') {
    document.adoptedStyleSheets = styleSheets
  }

  return (
    <div className={styles.Preview}>
      {isLoading && <div className={styles.PreviewLoading}></div>}
      <div className={styles.PreviewElementContainer}>
        <div id="root" className={styles.PreviewElement}>
          {element}
        </div>
      </div>
      {error && <pre className={styles.PreviewError}>{error}</pre>}
    </div>
  )
}
