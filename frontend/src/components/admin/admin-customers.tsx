import Button from '@components/button'
import { Input } from '@components/form'
import Table from '@components/table'
import TableRow from '@components/table/table-row'
import { AppRoute } from '@constants'
import { CustomersDataList } from '@slices/customers/type'
import { useActionCreators, useDispatch, useSelector } from '@store/hooks'
import clsx from 'clsx'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import {
    customersActions,
    customersSelector,
} from '../../services/slice/customers'
import { fetchCustomersWithFilters } from '../../services/slice/customers/thunk'
import styles from './admin.module.scss'

export default function AdminCustomers() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchCustomers, setSearchCustomers] = useState<string>(
        searchParams.get('search') || ''
    )
    const customersColumns = [
        {
            title: 'Имя / Дата регистрации',
            dataIndex: 'name',
            key: 'name',
            render: (row: CustomersDataList) => (
                <div className={styles.admin__tableCell}>
                    <span>{row.name.title}</span>
                    <span className={styles.admin__tableCellSubtitle}>
                        {row.registrationDate.title}
                    </span>
                </div>
            ),
        },
        {
            title: 'Последний заказ',
            dataIndex: 'lastOrder',
            key: 'lastOrder',
            render: (row: CustomersDataList) => (
                <div className={styles.admin__tableCell}>
                    {row.lastOrder.length > 0 ? (
                        <>
                            <span>
                                {row.lastOrder[0]}{' '}
                                {row.lastOrder.length > 1 && (
                                    <span
                                        className={
                                            styles.admin__tableCellSubtitle
                                        }
                                    >{` +${row.lastOrder.length - 1} товар`}</span>
                                )}
                            </span>
                            <span className={styles.admin__tableCellSubtitle}>
                                {row.orderCount.title}
                            </span>
                        </>
                    ) : (
                        <span className={styles.admin__tableCellSubtitle}>
                            Заказов не найдено
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: 'Общая сумма заказов',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
    ]
    const customers = useSelector(customersSelector.selectCustomers)
    const filterCountActive = useSelector(
        customersSelector.selectCountActiveFilter
    )
    const { updateFilter } = useActionCreators(customersActions)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchCustomers(e.target.value)
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
        dispatch(fetchCustomersWithFilters(filters))
    }, [searchParams, dispatch, updateFilter])

    return (
        <main className={clsx(styles.admin__products, styles.admin__container)}>
            <div className={styles.admin__headerTitle}>
                <h1 className={styles.admin__title}>Пользователи</h1>
                <span className={styles.admin__listCount}>
                    {customers.length} человек
                </span>
            </div>
            <div className={styles.admin__actionTable}>
                <form
                    className={styles.admin__formSearch}
                    onSubmit={(e) => handleSearch(e, searchCustomers)}
                >
                    <Input
                        onChange={handleInputChange}
                        extraClassLabel={styles.admin__searchLabel}
                        extraClass={styles.admin__searchInput}
                        value={searchCustomers}
                        placeholder='Введите имя, адрес или название товара'
                    />
                    <Button>Найти</Button>
                </form>
                <Button
                    extraClass={styles.admin__button_alt}
                    component={Link}
                    state={{ background: location }}
                    to={AppRoute.AdminCustomersFilter}
                >
                    Фильтры • {filterCountActive}
                </Button>
            </div>

            <Table columns={customersColumns} data={customers}>
                {({ rowData, columnsData }) => {
                    return (
                        <Link
                            key={rowData.key}
                            className={styles.admin__tableRow}
                            to={`/admin/customer/${rowData.key}`}
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
