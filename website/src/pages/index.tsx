import { Fragment } from 'react'
import styled from 'styled-components'

import { UseRunner as LiveRunner } from '../components/LiveRunner'
import { MultiFilesExample } from '../components/MultiFilesExample'
import { scope, examples } from '../constants'

const Container = styled.div`
  max-width: 1024px;
  margin: var(--header-height) auto 0;
  padding: 24px 16px;
`

const Title = styled.h3`
  color: steelblue;
  margin: 24px 0 12px 0;
`

const Description = styled.div`
  color: steelblue;
`

const Page = () => (
  <Container>
    <Description>Run your React code on the go, in different ways</Description>
    {examples.map(({ key, title, code }) => (
      <Fragment key={key}>
        <Title id={key}>{title}</Title>
        <LiveRunner code={code} scope={scope} language="tsx" />
      </Fragment>
    ))}
    <Title id="multi-files">Multi files (using CodeMirror)</Title>
    <MultiFilesExample />
  </Container>
)

export default Page
