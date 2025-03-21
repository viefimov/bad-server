import Button from '@components/button'
import { Input } from '@components/form'
import Table from '@components/table'
import TableRow from '@components/table/table-row'
import { AppRoute } from '@constants'
import { ordersActions, ordersSelector } from '@slices/orders'
import { OrderDataList } from '@slices/orders/type'
import { useActionCreators, useDispatch, useSelector } from '@store/hooks'
import clsx from 'clsx'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { fetchOrdersWithFilters } from '../../services/slice/orders/thunk'
import styles from './admin.module.scss'

export default function AdminOrders() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    const [searchOrder, setSearchOrder] = useState<string>(
        searchParams.get('search') || ''
    )
    const orderColumns = [
        {
            title: 'Номер / дата заказа',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (row: OrderDataList) => (
                <div className={styles.admin__tableCell}>
                    <span>{row.orderNumber.title}</span>
                    <span className={styles.admin__tableCellSubtitle}>
                        {row.orderDate.title}
                    </span>
                </div>
            ),
        },
        {
            title: 'Статус заказа',
            dataIndex: 'status',
            key: 'status',
            render: (row: OrderDataList) => (
                <span
                    className={clsx({
                        [styles[row.status.value]]: row.status.value,
                    })}
                >
                    {row.status.title}
                </span>
            ),
        },
        {
            title: 'Сумма заказа',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
    ]
    const orders = useSelector(ordersSelector.selectOrders)
    const filterCountActive = useSelector(
        ordersSelector.selectCountActiveFilter
    )
    const { updateFilter } = useActionCreators(ordersActions)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchOrder(e.target.value)
    }

    const handleSearch = useCallback(
        (e: FormEvent, value: string) => {
            e.preventDefault()
            dispatch(updateFilter({ search: value }))
            const filters: Record<string, unknown> = {}
            searchParams.forEach((value, key) => {
                filters[key] = value
            })
            setSearchParams({ ...filters, search: value })
        },
        [searchParams, dispatch, updateFilter, setSearchParams]
    )

    useEffect(() => {
        const filters: Record<string, unknown> = {}
        searchParams.forEach((value, key) => {
            filters[key] = value
        })
        dispatch(updateFilter(filters))
        dispatch(fetchOrdersWithFilters(filters))
    }, [searchParams, dispatch, updateFilter])

    return (
        <main className={clsx(styles.admin__products, styles.admin__container)}>
            <div className={styles.admin__headerTitle}>
                <h1 className={styles.admin__title}>Заказы</h1>{' '}
                <span className={styles.admin__listCount}>
                    {orders.length} заказов
                </span>
            </div>
            <div className={styles.admin__actionTable}>
                <form
                    className={styles.admin__formSearch}
                    onSubmit={(e) => handleSearch(e, searchOrder)}
                >
                    <Input
                        onChange={handleInputChange}
                        extraClassLabel={styles.admin__searchLabel}
                        extraClass={styles.admin__searchInput}
                        value={searchOrder}
                        placeholder='Введите номер заказа или название товара'
                    />
                    <Button>Найти</Button>
                </form>
                <Button
                    extraClass={styles.admin__button_alt}
                    component={Link}
                    state={{ background: location }}
                    to={AppRoute.AdminOrdersFilter}
                >
                    Фильтры • {filterCountActive}
                </Button>
            </div>

            <Table columns={orderColumns} data={orders}>
                {({ rowData, columnsData }) => {
                    return (
                        <Link
                            key={rowData.key}
                            className={styles.admin__tableRow}
                            to={`/admin/order/${rowData.orderNumber.value}`}
                            state={{ background: location }}
                        >
                            <TableRow
                                rowData={rowData}
                                columnsData={columnsData}
                            />
                        </Link>
                    )
                }}
            </Table>
        </main>
    )
}
