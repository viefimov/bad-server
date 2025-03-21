import clsx from 'clsx'
import { Column, DataRow } from './helpers/types'
import styles from './table.module.scss'

interface TableRowProps {
    rowData: DataRow
    columnsData: Column[]
}

export default function TableRow({ columnsData, rowData }: TableRowProps) {
    return (
        <div className={styles.table__row}>
            {columnsData.map((column) => {
                return (
                    <div
                        key={column.key}
                        className={clsx(
                            styles.table__cell,
                            column.extraClassTableCell &&
                                column.extraClassTableCell
                        )}
                    >
                        {column.render
                            ? column.render(rowData)
                            : rowData[column.dataIndex].title}
                    </div>
                )
            })}
        </div>
    )
}
