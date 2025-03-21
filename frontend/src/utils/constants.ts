import styles from '@components/card/card.module.scss'

export const API_URL = `${import.meta.env.VITE_API_ORIGIN}`
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}`

export type OptionType = {
    title: string
    value: string | number
}

export const REGEXP_IMAGE_NAME = /^.*[\\/\\]| \(\d+\)\.\w+$/g

export const CATEGORY_TYPES: OptionType[] = [
    {
        title: 'софт-скил',
        value: 'soft',
    },
    {
        title: 'хард-скил',
        value: 'hard',
    },
    {
        title: 'другое',
        value: 'other',
    },
    {
        title: 'дополнительное',
        value: 'additional',
    },
    {
        title: 'кнопка',
        value: 'button',
    },
]

export const FILTER_ORDER_TYPES: OptionType[] = [
    { value: '', title: 'Все' },
    { value: 'cancelled', title: 'Отменён' },
    { value: 'completed', title: 'Завершён' },
    { value: 'new', title: 'Новый' },
    { value: 'delivering', title: 'Доставляется' },
]

export const FILTER_ORDER_MAP = {
    cancelled: 'Отменён',
    completed: 'Завершён',
    new: 'Новый',
    delivering: 'Доставляется',
}

export const CATEGORY_CLASSES = {
    'софт-скил': styles.card__category_soft,
    'хард-скил': styles.card__category_hard,
    другое: styles.card__category_other,
    дополнительное: styles.card__category_additional,
    кнопка: styles.card__category_button,
}

export enum AppRoute {
    Product = '/product/:cardId',
    Basket = '/basket',
    Main = '/',
    NotFound = '/404',
    Order = '/order',
    Profile = '/profile',
    ProfilePassword = '/profile/password',
    ProfileOrder = '/profile/order/:number',
    ProfileOrders = '/profile/orders',
    OrderAddress = '/order/address',
    OrderContacts = '/order/contacts',
    OrderSuccess = '/order/success',
    Login = '/login',
    Register = '/register',
    Logout = '/logout',
    Admin = '/admin',
    AdminCustomers = '/admin/customers',
    AdminCustomer = '/admin/customer/:customerId',
    AdminCustomersFilter = '/admin/customers/filter',
    AdminOrders = '/admin/orders',
    AdminOrder = '/admin/order/:number',
    AdminOrdersFilter = '/admin/orders/filter',
    AddProduct = 'add',
    EditProduct = 'edit/:editId',
}

export enum FilterType {
    text = 'text',
    number = 'number',
    date = 'date',
    select = 'select',
}
