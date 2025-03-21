import clsx from 'clsx'
import { ReactNode } from 'react'
import { Column, DataRow } from './helpers/types'
import styles from './table.module.scss'

interface TableChildrenProps {
    rowData: DataRow
    columnsData: Column[]
}

interface TableProps {
    columns: Column[]
    data: DataRow[]
    children: (props: TableChildrenProps) => ReactNode
}

const Table = ({ columns, data, children }: TableProps) => {
    return (
        <div className={styles.table}>
            <div className={styles.table__header}>
                {columns.map((column) => (
                    <div
                        key={column.key}
                        className={clsx(
                            styles.table__headerCell,
                            column.extraClassHeaderCell &&
                                column.extraClassHeaderCell
                        )}
                    >
                        {column.title}
                    </div>
                ))}
            </div>
            <div className={styles.table__body}>
                {data.map((row) =>
                    children({ rowData: row, columnsData: columns })
                )}
            </div>
        </div>
    )
}

export default Table
