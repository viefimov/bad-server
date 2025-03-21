import { IOrderResult, StatusType } from '@types'
import { adapterOrderFromServer } from '../../../utils/adapterOrderFromServer'
import { RequestStatus } from '../../../utils/weblarek-api'

export interface OrderValueType {
    title: string
    value: string | number
}
export interface OrderDataFromServer extends IOrderResult {}

export interface OrderDataList {
    key: string
    orderNumber: OrderValueType
    orderDate: OrderValueType
    status: OrderValueType
    totalAmount: OrderValueType
    productNames: string[]
}

export interface OrderData extends ReturnType<typeof adapterOrderFromServer> {}

export interface FiltersOrder {
    orderDateFrom: string
    orderDateTo: string
    status: StatusType | ''
    totalAmountFrom: number
    totalAmountTo: number
    search: string
}

export type TOrdersState = {
    orders: OrderDataList[]
    ordersData: OrderDataFromServer[]
    orderSelected: OrderData | null
    filters: FiltersOrder
    status: RequestStatus
}
