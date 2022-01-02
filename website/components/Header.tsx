import styled from 'styled-components'

const Container = styled.header`
  background: steelblue;
  color: #fff;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`

const Nav = styled.nav`
  max-width: 1024px;
  height: 48px;
  margin: auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #eee;
  }
`

const Title = styled.h1`
  margin: 10px 0;
`

export const Header = () => (
  <Container>
    <Nav>
      <Link href="/">
        <Title>react-runner</Title>
      </Link>
      <Link href="https://github.com/nihgwu/react-runner">Github</Link>
    </Nav>
  </Container>
)
