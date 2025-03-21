import { adapterCustomerFromServer } from '../../../utils/adapterCustomerFromServer'
import { ICustomerResult } from '../../../utils/types'
import { RequestStatus } from '../../../utils/weblarek-api'

export interface CustomersValueType {
    title: string
    value: string | number
}
export interface CustomersDataFromServer extends ICustomerResult {}

export interface CustomersData
    extends ReturnType<typeof adapterCustomerFromServer> {}

export interface CustomersDataList {
    key: string
    registrationDate: CustomersValueType
    lastOrderDate: CustomersValueType
    totalAmount: CustomersValueType
    orderCount: CustomersValueType
    name: CustomersValueType
    deliveryAddress: CustomersValueType
    lastOrder: string[]
}

export interface FiltersCustomers {
    registrationDateFrom: string
    registrationDateTo: string
    lastOrderDateFrom: string
    lastOrderDateTo: string
    totalAmountFrom: number
    totalAmountTo: number
    orderCountFrom: number
    orderCountTo: number
    search: string
}

export type TCustomersState = {
    customerSelected: CustomersData | null
    customersData: CustomersDataFromServer[]
    customers: CustomersDataList[]
    filters: FiltersCustomers
    status: RequestStatus
}
