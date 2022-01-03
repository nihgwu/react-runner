import styled from 'styled-components'
import NextLink from 'next/link'

const Container = styled.header`
  background: steelblue;
  color: #fff;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`

const Head = styled.div`
  max-width: 1024px;
  height: 48px;
  margin: auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Nav = styled.nav`
  & > :not(:last-child) {
    margin-right: 16px;
  }
`

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #eee;
  }
`

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`

export const Header = () => (
  <Container>
    <Head>
      <NextLink href="/" passHref>
        <Link>
          <Title>React Runner</Title>
        </Link>
      </NextLink>
      <Nav>
        <NextLink href="/playground" passHref>
          <Link>Playground</Link>
        </NextLink>
        <Link href="https://github.com/nihgwu/react-runner">Github</Link>
      </Nav>
    </Head>
  </Container>
)
