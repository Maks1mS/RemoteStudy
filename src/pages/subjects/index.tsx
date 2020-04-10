/* eslint-disable react/jsx-key */
import { NextPage } from 'next'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useTable, useSortBy } from 'react-table'
import Link from 'next/link'
import React from 'react'

import withApollo from '../../lib/withApollo'
import Container from '../../components/Container'
import MainLayout from '../../layout/MainLayout'

import { Emoji } from 'emoji-mart'
import BarLoader from 'react-spinners/BarLoader'

const QUERY = gql`
  {
    subjects {
      key
      name
      tasks {
        name
      }
    }
  }
`

const Table = ({ columns, data }): JSX.Element => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  }, useSortBy)

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div css={css`
                  display: flex;
                  justify-content: center;
                `}>
                  <span css={css`
                    padding-right: 5px;
                  `}>
                    {column.render('Header')}
                  </span>
                  <span css={css`
                    display: grid;
                    align-content: center;
                  `}>
                    {column.isSorted
                      ? (column.isSortedDesc
                        ? <Emoji emoji=':arrow_down_small:' size={16} />
                        : <Emoji emoji=':arrow_up_small:' size={16} />)
                      : <Emoji emoji=':arrow_up_down:' size={16} />}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const Index: NextPage = () => {
  const { loading, data } = useQuery(QUERY)

  let subjects = []
  if (loading || !data) {
  } else {
    subjects = data.subjects
  }
  const tableData = React.useMemo(() => subjects.map(v => {
    return {
      subject: <Link href="/subjects/[name]" as={`/subjects/${v.key}`}><a>{v.name}</a></Link>,
      tasksCnt: v.tasks.length,
      tasks: v.tasks.map(task => task.name).slice(0, 3).join('  |  ')
    }
  }), [subjects])
  const columns = React.useMemo(() => [
    {
      Header: 'Предмет',
      accessor: 'subject'
    }, {
      Header: 'Кол-во уроков',
      accessor: 'tasksCnt',
      sortType: 'basic'
    }, {
      Header: 'Последние задания',
      accessor: 'tasks'
    }
  ], [])

  return <MainLayout>
    <Container css={css`
          min-height: 100px;
          margin: 10px;
          table {
            width: 100%;
            border: 1px solid #eaeaea;
            tr {
              :last-child {
                td {
                  border-bottom: 0;
                }
              }
            }
            thead {
              height: 25px;
            }
            th, td {
              border-bottom: 1px solid #eaeaea;
              border-right: 1px solid #eaeaea;
              :last-child {
                border-right: 0;
              }
            }
          }
        `}>
      <div>
        <h2 css={css`
              font-style: bold;
              font-size: 50px;
            `}>Предметы</h2>
      </div>
      { tableData && <Table columns={columns} data={tableData} /> }
      <BarLoader width="100%" loading={loading} />
    </Container>
  </MainLayout>
}

export default withApollo(Index)
