import { NextPage } from 'next'
import { css } from '@emotion/core'
import withApollo from '../lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import News from '../components/News'
import Container from '../components/Container'
import MainLayout from '../layout/MainLayout'
import { Emoji } from 'emoji-mart'
import PulseLoader from 'react-spinners/PulseLoader'

const QUERY = gql`
  {
    news {
      title
    }
    timetable {
      name
    }
    isDayOff
  }
`

const Index: NextPage = () => {
  const { loading, data } = useQuery(QUERY)

  let newsList
  let timeTable: JSX.Element = <PulseLoader/>
  if (loading || !data) {
    newsList = <h1>loading...</h1>
  } else {
    const { news, timetable, isDayOff } = data
    newsList = news.map(v => {
      return <News key={v.title} title={v.title} />
    })
    let i = 1
    if (isDayOff) {
      timeTable = <div css={css`
        font-size: 35px;
        padding-top: 25px;
        display: flex;
      `}>
        <Emoji emoji=':grin:' size={48} />
        <div css={css`padding-left: 5px; display: flex;align-items: center;`}>Выходной! Иди поспи лучше!</div>
      </div>
    } else {
      timeTable = timetable.map(v => {
      // eslint-disable-next-line react/jsx-key
        return <div css={css`font-size: 35px;`}>{`${i++}.${v.name}`}</div>
      })
    }
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
      Да, да, да, я знаю что неделя не та. Потом исправлю.
    </Container>
  </MainLayout>
}

/**
 *  <Container css={css`
      margin: 10px;
      `}>
      {newsList}
    </Container>
 */

export default withApollo(Index)
