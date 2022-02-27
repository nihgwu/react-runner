import { useState } from 'react'
import styled from 'styled-components'
import { useRunner, Scope } from 'react-runner'
import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveError,
  CodeEditor,
  useLiveRunner,
  Language,
} from 'react-live-runner'
import { CodeMirror as CM } from 'react-runner-codemirror'

export const Container = styled.div`
  display: flex;
  box-shadow: 0 0 2px 0 lightsteelblue;
  height: 300px;
  overflow: hidden;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    height: 480px;
  }
`

export const EditorContainer = styled.div`
  flex: 0 1 720px;
  overflow: auto;
`

export const Editor = styled(CodeEditor)`
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
  font-size: 14px;
  white-space: pre;
  caret-color: #fff;
  min-width: 100%;
  min-height: 100%;
  float: left;

  & > textarea,
  & > pre {
    outline: none;
    white-space: pre !important;
  }
`

export const CodeMirror = styled(CM)`
  font-size: 14px;
  flex: 0 1 720px;
  overflow: hidden;
`

export const PreviewContainer = styled.div`
  flex: 1 1 720px;
  position: relative;
  display: flex;
  overflow: hidden;
`

export const Preview = styled.div`
  margin: auto;
  white-space: pre-wrap;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
`

export const PreviewError = styled.div`
  background: #fcc;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  margin: 0;
  padding: 10px;
  color: #f00;
  white-space: pre-wrap;
`

type Props = {
  code?: string
  scope?: Scope
  transformCode?: (code: string) => string
  language?: Language
}

export const LiveRunner = (props: Props) => (
  <LiveProvider {...props}>
    <Container>
      <EditorContainer>
        <Editor as={LiveEditor} />
      </EditorContainer>
      <PreviewContainer>
        <Preview as={LivePreview} />
        <PreviewError as={LiveError} />
      </PreviewContainer>
    </Container>
  </LiveProvider>
)

export const UseLiveRunner = ({
  code: initialCode,
  language,
  ...rest
}: Props) => {
  const { element, error, code, onChange } = useLiveRunner({
    initialCode,
    ...rest,
  })

  return (
    <Container>
      <EditorContainer>
        <Editor value={code} language={language} onChange={onChange} />
      </EditorContainer>
      <PreviewContainer>
        <Preview>{element}</Preview>
        {error && <PreviewError>{error}</PreviewError>}
      </PreviewContainer>
    </Container>
  )
}

export const UseRunner = ({
  code: initialCode,
  transformCode,
  language,
  ...rest
}: Props) => {
  const [code, setCode] = useState((initialCode || '').trim())
  const { element, error } = useRunner({
    code: transformCode ? transformCode(code) : code,
    ...rest,
  })

  return (
    <Container>
      <EditorContainer>
        <Editor value={code} language={language} onChange={setCode} />
      </EditorContainer>
      <PreviewContainer>
        <Preview>{element}</Preview>
        {error && <PreviewError>{error}</PreviewError>}
      </PreviewContainer>
    </Container>
  )
}
