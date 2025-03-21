import { FilterType } from '../../../utils/constants'

export const customersFilterFields = [
    { label: 'Дата регистрации' },
    { name: 'registrationDateFrom', label: 'с', type: FilterType.date },
    { name: 'registrationDateTo', label: 'по', type: FilterType.date },
    { label: 'Последний заказ' },
    { name: 'lastOrderDateFrom', label: 'с', type: FilterType.date },
    { name: 'lastOrderDateTo', label: 'по', type: FilterType.date },
    { label: 'Сумма заказов' },
    { name: 'totalAmountFrom', label: 'от', type: FilterType.number },
    { name: 'totalAmountTo', label: 'до', type: FilterType.number },
    { label: 'Количество заказов' },
    { name: 'orderCountFrom', label: 'от', type: FilterType.number },
    { name: 'orderCountTo', label: 'до', type: FilterType.number },
]
