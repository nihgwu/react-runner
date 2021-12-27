import { Fragment } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import LiveRunner from '../components/LiveRunner'
import examples from '../examples'

const Title = styled.h3`
  color: steelblue;
`

const Description = styled.div`
  color: steelblue;
`

const Page = () => (
  <Layout>
    <Description>Run your React code on the go, in different ways</Description>
    {examples.map(({ key, title, code, scope }) => (
      <Fragment key={key}>
        <Title id={key}>{title}</Title>
        <LiveRunner code={code} scope={scope} />
      </Fragment>
    ))}
  </Layout>
)

export default Page
