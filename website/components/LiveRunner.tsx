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

const Container = styled.div`
  display: flex;
  box-shadow: 0 0 8px 0 lightsteelblue;
  height: 250px;
  overflow: hidden;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    height: 400px;
  }
`

const EditorContainer = styled.div`
  flex: 1;
  overflow: auto;
`

const Editor = styled(CodeEditor)`
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

const PreviewContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  overflow: auto;
`

const Preview = styled.div`
  margin: auto;
  text-align: center;
`

const Error = styled.div`
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
  code: string
  scope?: Scope
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
        <Error as={LiveError} />
      </PreviewContainer>
    </Container>
  </LiveProvider>
)

export const UseLiveRunner = ({ code: sourceCode, scope, language }: Props) => {
  const { element, error, code, onChange } = useLiveRunner({
    sourceCode,
    scope,
  })

  return (
    <Container>
      <EditorContainer>
        <Editor value={code} language={language} onChange={onChange} />
      </EditorContainer>
      <PreviewContainer>
        {error && <Error>{error}</Error>}
        <Preview>{element}</Preview>
      </PreviewContainer>
    </Container>
  )
}

export const UseRunner = ({ code: sourceCode, scope, language }: Props) => {
  const [code, setCode] = useState((sourceCode || '').trim())
  const { element, error } = useRunner({ code, scope })

  return (
    <Container>
      <EditorContainer>
        <Editor value={code} language={language} onChange={setCode} />
      </EditorContainer>
      <PreviewContainer>
        {error && <Error>{error}</Error>}
        <Preview>{element}</Preview>
      </PreviewContainer>
    </Container>
  )
}

export default UseRunner
