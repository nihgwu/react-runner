import React from 'react'

import { ShadowRoot } from './ShadowRoot'
import { useAsyncRunner } from '../hooks/useAsyncRunner'
import styles from './Preview.module.css'

if (typeof window !== 'undefined') {
  // @ts-expect-error
  window.process = { env: {} }
}

const baseScope = {
  import: {
    react: React,
  },
}

export const Preview = ({ files }: { files: Record<string, string> }) => {
  const { element, styleSheets, error, isLoading } = useAsyncRunner({
    files,
    scope: baseScope,
  })

  return (
    <div className={styles.Preview}>
      {isLoading && <div className={styles.PreviewLoading}></div>}
      <div className={styles.PreviewElement}>
        {styleSheets.length > 0 ? (
          <ShadowRoot styleSheets={styleSheets}>{element}</ShadowRoot>
        ) : (
          element
        )}
      </div>
      {error && <pre className={styles.PreviewError}>{error}</pre>}
    </div>
  )
}
