import React from 'react'
import styled from 'styled-components'

type Item = {
  id: number
  title: string
  points?: number | null
  user?: string | null
  time: number
  time_ago: string
  comments_count: number
  type: string
  url?: string
  domain?: string
}

const getItems = (page: number): Promise<Item[]> =>
  fetch(`https://api.hnpwa.com/v0/news/${page}.json`)
    .then((response) => response.json())
    .catch()

const Link = styled.a`
  color: steelblue;
  text-decoration: none;
`

const Meta = styled.span`
  color: gray;
  font-size: small;

  & + &::before {
    content: '|';
    margin: 8px;
  }
`

const Item = ({ item }: { item: Item }) => (
  <li>
    <Link href={item.url} target="_blank" rel="noopener noreferrer">
      {item.title}
    </Link>
    <div>
      <Meta>{item.points} points</Meta>
      <Meta>
        by {item.user} {item.time_ago}
      </Meta>
      <Meta>{item.comments_count} comments</Meta>
    </div>
  </li>
)

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
`

const List = ({ page }: { page: number }) => {
  const [items, setItems] = React.useState<Item[] | null>(null)

  React.useEffect(() => {
    getItems(page).then(setItems)
  }, [page])

  if (!items) return <Meta>loading...</Meta>
  return (
    <Ul>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Ul>
  )
}

const Container = styled.div`
  padding: 16px;
  max-width: 640px;
  margin: auto;
  background: white;
`

const Header = styled.header`
  height: 48px;
  position: sticky;
  top: 0;
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.button`
  background: none;
  border: none;
`

const App = () => {
  const [page, setPage] = React.useState(1)

  return (
    <Container>
      <Header>
        <h2>Hacker News</h2>
        <div>
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            prev
          </Button>
          <Meta> {page} / 10 </Meta>
          <Button disabled={page >= 10} onClick={() => setPage(page + 1)}>
            next
          </Button>
        </div>
      </Header>
      <List page={page} />
    </Container>
  )
}

export default App
