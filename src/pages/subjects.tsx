/* eslint-disable react/jsx-key */
import { NextPage } from 'next'
import { css } from '@emotion/core'
import withApollo from '../lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useTable, useSortBy } from 'react-table'
import Container from '../components/Container'
import Link from 'next/link'
import React from 'react'
import MainLayout from '../layout/MainLayout'

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

const Table = ({ columns, data }) => {
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
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                column.render('Header')}
              <span>
                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
              </span>
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
  const tableData = React.useMemo(() => subjects.map(v => (
    {
      subject: <Link href={`/subjects/${v.key}`}>{v.name}</Link>,
      tasksCnt: v.tasks.length,
      tasks: v.tasks.map(task => task.name).slice(0, 3).join(',')
    }
  )), [subjects])
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
            border: 1px solid black;
            tr {
              :last-child {
                td {
                  border-bottom: 0;
                }
              }
            }
            th, td {
              border-bottom: 1px solid black;
              border-right: 1px solid black;
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
    </Container>
  </MainLayout>
}

export default withApollo(Index)
