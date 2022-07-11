import React, { Fragment, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import { Navbar } from '../../common';
import { api, navigateAndRefresh } from '../../utils';
import styles from './PlatformListPage.module.scss';

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

function PlatformsTable({ columns, platforms }) {
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
          data: platforms,
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

function PlatformListPage() {
    const [platforms, setPlatforms] = useState([]);

    const handleJoin = async (handle, platformPwd) => {
        let userInput;
        if (platformPwd) {
            userInput = prompt("Password:")
        }
        if (!platformPwd || userInput === platformPwd) {
            // Access granted
            await api.post('/api/platforms/auth', { handle: handle })
                .then(res => {
                    window.sessionStorage.setItem('platform_token', res.data['token'])
                })
                .catch(err => {});
            
            navigateAndRefresh(`/platform/${handle}`)
        }
        else {
            alert("Platform access denied: invalid password");
        }
    };

    const showInfo = (description) => {
        alert(description ? description : "<No Description>");
    };

    const columns = useMemo(() => 
    [
        {
            Header: 'Name',
            accessor: 'name',
            maxWidth: 600,
            width: 350,
        },
        {
            Header: 'Handle',
            accessor: 'handle',
            maxWidth: 600,
            width: 150,
        },
        {
            Header: 'Problems',
            accessor: 'problems',
            maxWidth: 200,
            width: 80,
        },
        {
            Header: () => null,
            id: 'options',
            accessor: 'options',
            Cell: ({ row }) => {
                const {
                    handle,
                    password,
                    description
                } = row['original'];
                return (
                    <div className={styles['options']}>
                        <span>
                            <a href="#" onClick={() => handleJoin(handle, password)}>Join</a>
                        </span>
                        <span>
                            <a href="#" onClick={() => showInfo(description)}>Info</a>
                        </span>
                    </div>
                );
            },
            width: 80,
        },
    ], []);
    
    useEffect(async () => {
        // const tokenStatus = await getTokenStatus();
        // if (!tokenStatus?.['verified']) navigate("/login");

        // Retrieve entire list of platforms
        await api.get('/api/platforms/list')
            .then(res => setPlatforms(res.data['data'] || []))
            .catch(err => {});
    }, []);

    return (
        <>
            <Navbar />
            <Styles>
                <h2>Platforms</h2>
                <PlatformsTable
                columns={columns}
                platforms={platforms}
                />
            </Styles>
        </>
    );
}

export default PlatformListPage;