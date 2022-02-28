import { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { useLiveRunner } from 'react-live-runner'

import {
  CodeMirror,
  Preview,
  PreviewContainer,
  PreviewError,
} from '../components/LiveRunner'
import { getHashCode, updateHash } from '../utils/urlHash'
import { scope } from '../constants'

// @ts-ignore
import sampleCode from '!!raw-loader!./examples/hacker-news.tsx'

const Container = styled.div`
  display: flex;
  overflow: hidden;
  position: fixed;
  top: var(--header-height);
  right: 0;
  bottom: 0;
  left: 0;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }
`

const Playground = () => {
  const { element, error, code, onChange } = useLiveRunner({ scope })

  // reset to clear editing history
  const [editorKey, resetEditor] = useReducer((state: number) => state + 1, 0)

  const hashCode = getHashCode()
  useEffect(() => {
    if (hashCode !== undefined) {
      onChange(getHashCode())
      resetEditor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (hashCode === undefined) {
      onChange(sampleCode)
      resetEditor()
    }
    updateHash(code)
  })
  return (
    <Container>
      <CodeMirror
        key={editorKey}
        value={code}
        padding={16}
        showLineNumbers
        onChange={onChange}
      />
      <PreviewContainer>
        <Preview>{element}</Preview>
        {error && <PreviewError>{error}</PreviewError>}
      </PreviewContainer>
    </Container>
  )
}

export default Playground
