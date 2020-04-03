import { NextPage } from 'next'
import { css } from '@emotion/core'
import withApollo from '../lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import News from '../components/News'
import Container from '../components/Container'
import MainLayout from '../layout/MainLayout'

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

  return <MainLayout>
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
  </MainLayout>
}

export default withApollo(Index)
