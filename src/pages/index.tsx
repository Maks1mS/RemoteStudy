import { NextPage, NextPageContext } from 'next'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import withApollo from '../lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { gql, ApolloClient, InMemoryCache } from 'apollo-boost'
import News from '../components/News'
import Container from '../components/Container'
import Link from 'next/link'

const QUERY = gql`
  {
    news {
      title
    }
    timetable {
      name
    }
  }
`
const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: "header" "main";
  grid-template-rows:  50px 1fr;
`
const Header = styled.header`
  grid-area: "header";
  height: 50px;
  background: #212529;
  color: #fff;
  display: flex;
  flex-direction: row;
`

const NavLink = styled.a`
  display: flex;
  height: 100%;
  align-items: center;
`

const Main = styled.main`
  grid-area: "main";
  display: grid;
  grid-template-columns: 1fr 1fr; 
`

const Index: NextPage = () => {
  const { loading, data } = useQuery(QUERY)

  let newsList
  let timeTable = ''
  if (loading || !data) {
    newsList = <h1>loading...</h1>
  } else {
    const { news, timetable } = data
    newsList = news.map(v => {
      return <News key={v.title} title={v.title} />
    })
    let i = 1
    timeTable = timetable.map(v => {
      // eslint-disable-next-line react/jsx-key
      return <div css={css`font-size: 35px;`}>{`${i++}.${v.name}`}</div>
    })
  }

  return <>
    <Layout>
      <Header>
        <div css={css`
          vertical-align: center;
        `}>
          <Link href="/">
            <NavLink css={css`font-weight: bold; font-size: 30px;`}>Remote Study</NavLink>
          </Link>
        </div>
        <Link href="/timetable">
          <NavLink>Все предметы</NavLink>
        </Link>
      </Header>
      <Main>
        <Container css={css`
          height: 240px;
          margin: 10px;
        `}>
          <div>
            <h2 css={css`
              font-style: bold;
              font-size: 50px;
            `}>Мое расписание</h2>
          </div>
          {timeTable}
        </Container>
        <Container css={css`
          margin: 10px;
        `}>
          {newsList}
        </Container>
      </Main>
    </Layout>
  </>
}

export default withApollo(Index)
