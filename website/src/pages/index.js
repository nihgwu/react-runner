import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import LiveRunner from '../components/LiveRunner'
import examples from '../../examples'

const Title = styled.h3`
  color: steelblue;
`

const Page = () => (
  <Layout>
    {examples.map(({ key, title, code, scope }) => (
      <React.Fragment key={key}>
        <Title id={key}>{title}</Title>
        <LiveRunner code={code} scope={scope} />
      </React.Fragment>
    ))}
  </Layout>
)

export default Page
