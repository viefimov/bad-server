import { useActionCreators, useDispatch, useSelector } from '@store/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    customersActions,
    customersSelector,
} from '../../services/slice/customers'
import { fetchCustomersWithFilters } from '../../services/slice/customers/thunk'
import { AppRoute } from '../../utils/constants'
import Filter from '../filter'
import styles from './admin.module.scss'
import { customersFilterFields } from './helpers/customersFilterFields'

export default function AdminFilterCustomers() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [_, setSearchParams] = useSearchParams()
    const { updateFilter, clearFilters } = useActionCreators(customersActions)
    const filterCustomersOption = useSelector(
        customersSelector.selectFilterOption
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const handleFilter = (filters: Record<string, any>) => {
        dispatch(updateFilter({ ...filters }))
        const queryParams: { [key: string]: string } = {}
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                queryParams[key] =
                    typeof value === 'object' ? value.value : value.toString()
            }
        })
        setSearchParams(queryParams)
        navigate(
            `${AppRoute.AdminCustomers}?${new URLSearchParams(
                queryParams
            ).toString()}`
        )
    }

    const handleClearFilters = () => {
        dispatch(clearFilters())
        setSearchParams({})
        dispatch(fetchCustomersWithFilters({}))
        navigate(AppRoute.AdminCustomers)
    }

    return (
        <>
            <h2 className={styles.admin__title}>Фильтры</h2>
            <Filter
                fields={customersFilterFields}
                onFilter={handleFilter}
                defaultValue={filterCustomersOption}
                onClear={handleClearFilters}
            />
        </>
    )
}
