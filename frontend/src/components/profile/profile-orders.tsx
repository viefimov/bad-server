import Button from '@components/button'
import { Input } from '@components/form'
import Table from '@components/table'
import TableRow from '@components/table/table-row'
import { OrderDataList } from '@slices/orders/type'
import { profileOrdersSelector } from '@slices/profile-orders'
import { fetchOrdersMeWithFilters } from '@slices/profile-orders/thunk'
import { useDispatch } from '@store/hooks'
import clsx from 'clsx'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { IOrderPaginationResult } from '../../utils/types'
import Pagination from '../pagination'
import usePagination from '../pagination/helpers/usePagination'
import styles from './profile.module.scss'

export default function ProfileOrders() {
    const dispatch = useDispatch()
    const location = useLocation()
    // const orders = useSelector(profileOrdersSelector.selectProfileOrders);
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchOrder, setSearchOrder] = useState<string>(
        searchParams.get('search') || ''
    )

    const {
        data: orders,
        totalPages,
        currentPage,
        limit,
        nextPage,
        prevPage,
    } = usePagination<IOrderPaginationResult, OrderDataList>(
        fetchOrdersMeWithFilters,
        profileOrdersSelector.selectProfileOrders,
        5
    )

    const orderColumns = [
        {
            title: '№',
            extraClassHeaderCell: styles.profile__tableCellSmall,
            extraClassTableCell: styles.profile__tableCellSmall,
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (row: OrderDataList) => (
                <span className={styles.profile__tableCellSecondary}>
                    {row.orderNumber.title}.
                </span>
            ),
        },
        {
            title: 'Название',
            extraClassHeaderCell: styles.profile__tableCellBig,
            extraClassTableCell: styles.profile__tableCellBig,
            dataIndex: 'productNames',
            key: 'productNames',
            render: (row: OrderDataList) => (
                <span>
                    {row.productNames[0]}{' '}
                    {row.productNames.length > 1 && (
                        <span
                            className={styles.profile__tableCellSubtitle}
                        >{` +${row.productNames.length - 1} товар`}</span>
                    )}
                </span>
            ),
        },
        {
            title: 'Статус',
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
            title: 'Стоимость',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
    ]
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchOrder(e.target.value)
    }

    const handleSearch = useCallback(
        (e: FormEvent, value: string) => {
            e.preventDefault()
            const filters: Record<string, unknown> = {}
            searchParams.forEach((value, key) => {
                filters[key] = value
            })
            setSearchParams({ ...filters, search: value })
        },
        [searchParams, dispatch, setSearchParams]
    )

    return (
        <main
            className={clsx(
                styles.profile__products,
                styles.profile__container
            )}
        >
            <div className={styles.profile__headerTitle}>
                <h1 className={styles.profile__title}>Мои заказы</h1>
            </div>
            <form
                className={styles.profile__formSearch}
                onSubmit={(e) => handleSearch(e, searchOrder)}
            >
                <Input
                    onChange={handleInputChange}
                    extraClassLabel={styles.profile__searchLabel}
                    extraClass={styles.profile__searchInput}
                    value={searchOrder}
                    placeholder='Введите номер заказа или название товара'
                />
                <Button>Найти</Button>
            </form>
            <Table columns={orderColumns} data={orders}>
                {({ rowData, columnsData }) => {
                    return (
                        <Link
                            key={rowData.key}
                            className={styles.profile__tableRow}
                            to={`/profile/order/${rowData.orderNumber.value}`}
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
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                onNextPage={nextPage}
                onPrevPage={prevPage}
            />
        </main>
    )
}
