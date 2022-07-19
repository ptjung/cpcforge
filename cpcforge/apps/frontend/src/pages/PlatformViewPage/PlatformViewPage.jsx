import React, { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import { Page } from '../../common';
import { api } from '../../utils';
import styles from './PlatformViewPage.module.scss';

const Styles = styled.div`
    font-family: Roboto;
    display: block;
    margin-top: 3rem;
    margin-left: 3rem;
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid #aaa;

        tr {
            :last-child {
                td {
                border-bottom: 0;
                }
            }
        }

        th, td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid #aaa;
            border-right: 1px solid #aaa;

            :last-child {
                border-right: 0;
            }
        }

        td {
            input {
                font-size: 1rem;
                padding: 0;
                margin: 0;
                border: 0;
            }
        }
    }

    .pagination {
        padding: 0.5rem;
    }
`;

function ProblemsTable({ columns, problems }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
          columns,
          data: problems,
          initialState: { pageIndex: 0 },
        },
     usePagination);
  
    return (
    <>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                    })}>
                        {column.render('Header')}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
                prepareRow(row)
                return (
                    <Fragment key={`row-${i}`}>
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    </Fragment>
                );
            })}
            </tbody>
        </table>
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
            <span>
                Page{' '}
                <strong>
                {pageIndex + 1} of {Math.max(pageOptions.length, 1)}
                </strong>{' '}
            </span>
            <span>
                | Go to page:{' '}
                <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                }}
                style={{ width: '100px' }}
                />
            </span>{' '}
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                </option>
                ))}
            </select>
        </div>
    </>
    );
}

function PlatformViewPage() {
    const [problems, setProblems] = useState([]);
    // const pageContext = usePageContext();
    const pltHandle = 'rcpc';
    // console.log(pageContext);

    const columns = useMemo(() => 
    [
        {
            Header: 'Problem',
            accessor: 'name',
            maxWidth: 600,
            width: 350,
            Cell: ({ row }) => {
                const {
                    name: probName,
                    handle: probHandle
                } = row['original'];

                return (
                    <span>
                        <a href={`${pltHandle}/problem/${probHandle}`}>{probName}</a>
                    </span>
                );
            },
        },
        {
            Header: 'Handle',
            accessor: 'handle',
            maxWidth: 300,
            width: 100,
        },
        {
            Header: 'Author',
            accessor: 'author',
            maxWidth: 300,
            width: 100,
        }
    ], []);
    
    useEffect(async () => {
        // if unverified by account, navigate to /login
        // if unverified by platform, navigate to /list
        await api.post('/api/platforms/retrieve', { handle: pltHandle })
            .then(res => {
                if ( res.data['status'] === 'success' ) {
                    setProblems(res.data['result']['problems'].map(p => {
                        return {
                            name: p.name,
                            handle: p.handle,
                            author: p.author
                        };
                    }));
                }
            })
            .catch(err => {});
    }, []);

    return (
        <Page>
            <Styles>
                    <h2>Problem Bank</h2>
                    <ProblemsTable
                    columns={columns}
                    problems={problems}
                    />
                    <div className={styles['form-bottom']}>
                        <button type="button" onClick={() => { /* navigate to /create problem */ }}>
                            Create Problem
                        </button>
                    </div>
            </Styles>
        </Page>
    );
}

export default PlatformViewPage;