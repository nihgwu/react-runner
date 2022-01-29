import { Fragment } from 'react'
import styled from 'styled-components'

import { UseRunner as LiveRunner } from '../components/LiveRunner'
import { MultiFilesExample } from '../components/MultiFilesExample'
import { scope, examples } from '../constants'

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px 16px;
`

const Title = styled.h3`
  color: steelblue;
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
    <Title id="multi-files">Multi files</Title>
    <MultiFilesExample />
  </Container>
)

export default Page
