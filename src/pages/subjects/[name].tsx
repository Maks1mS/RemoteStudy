import { NextPage } from 'next'
import { useRouter, withRouter, NextRouter } from 'next/router'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from '@emotion/styled'
import MainLayout from '../../layout/MainLayout'
import Container from '../../components/Container'
import withApollo from '../../lib/withApollo'
import Error from 'next/error'
import Button from '../../components/Button'
import PulseLoader from 'react-spinners/PulseLoader'

const QUERY = gql`
  query Query($key: String){
    subject(key: $key) {
      key
      name
      url
      tasks {
        name
      }
    }
  }
`

const cacheQuery = gql`
  {
    subjects {
      key
      name
      url
      tasks {
        name
      }
    }
  }
`

const CenterLoader = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
`
type AllSubjects = {
  subjects: [{
    key: string
  }]
}

type OneSubject = {
  subject: {}
}

type Request = AllSubjects | OneSubject

const Index: NextPage<{router: NextRouter}> = ({ router }) => {
  if (router.query.name === undefined) {
    return <></>
  }

  let { loading, data, error } = useQuery<Request>(cacheQuery, { fetchPolicy: 'cache-only' })
  if (!loading && !error && !data) {
    ({ loading, data, error } = useQuery<Request, {key: string}>(QUERY, { variables: { key: router.query.name as string } }))
  }

  if (loading) {
    return <CenterLoader><PulseLoader/></CenterLoader>
  }
  if (error) {
    return <Error statusCode={404} />
  }
  let subject
  if ((data as OneSubject).subject) {
    ({ subject } = (data as OneSubject))
  } else {
    subject = (data as AllSubjects).subjects.find(x => x.key === router.query.name)
    if (!subject) return <Error statusCode={404} />
  }
  return <MainLayout>
    <div>
      <Container css={css`
      margin: 10px;
    `}>
        <h2 css={css`
        font-style: bold;
        font-size: 50px;
      `}>{subject.name}</h2>
        <Button onClick={() => { window.open(subject.url, '_blank') } }>ОТКРЫТЬ</Button>
        <ul>
          {subject.tasks.map((v, i) => <li key={i}>{v.name}</li>)}
        </ul>
      </Container>
    </div>
  </MainLayout>
}

export default withApollo(withRouter(Index))
