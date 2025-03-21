export interface Column {
    title: string
    dataIndex: string
    key: string
    extraClassHeaderCell?: string
    extraClassTableCell?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (row: any) => JSX.Element
}

export interface DataRow {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any // Для поддержки любых дополнительных полей
}
