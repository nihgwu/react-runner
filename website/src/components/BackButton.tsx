import styled from 'styled-components'
import NextLink from 'next/link'

const RoundLink = styled.a`
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 9999;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 2px solid steelblue;
  color: steelblue;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
`

export const BackButton = () => (
  <NextLink href="/" passHref>
    <RoundLink>X</RoundLink>
  </NextLink>
)
