import { CATEGORY_CLASSES, FILTER_ORDER_MAP } from '@constants'
import { PaymentType } from '../../components/order/helpers/types'

export enum StatusType {
    Cancelled = 'cancelled',
    Completed = 'completed',
    New = 'new',
    Delivering = 'delivering',
}

export interface IProduct {
    _id: string
    title: string
    price: number | null
    description: string
    category: keyof typeof CATEGORY_CLASSES
    image: IFile
}

export interface IProductPaginationResult {
    items: IProduct[]
    pagination: {
        currentPage: number
        pageSize: number
        totalOrders: number
        totalPages: number
    }
}

export interface IFile {
    fileName: string
    originalName: string
}

export interface IBasket {
    items: IProduct[]
    totalCount: number
}

export interface IOrder {
    payment: PaymentType
    email: string
    phone: string
    address: string
    total: number
    items: string[]
}

export interface IUser {
    email: string
    name: string
}

export interface ICustomer extends IUser {
    id: string
    lastOrder: string
    lastOrderDate: string
    orderCount: number
    orders: string[]
    roles: string[]
    totalAmount: number
}
export interface ICustomer extends IUser {
    surname: string
    deliveryAddress: string
}

export type ServerResponse<T> = {
    success: boolean
} & T

export type UserResponseToken = ServerResponse<{
    user: IUser
    accessToken: string
    refreshToken: string
}>

export type UserResponse = ServerResponse<{
    user: IUser
}>

export type RefreshResponse = ServerResponse<{
    accessToken: string
    refreshToken: string
}>

export type UserLoginBodyDto = {
    email: string
    password: string
}

export type UserRegisterBodyDto = {
    password: string
} & IUser

export type OrderForm = Omit<IOrder, 'total' | 'items'>

export interface ICustomerPaginationResult {
    customers: ICustomerResult[]
    pagination: {
        currentPage: number
        pageSize: number
        totalOrders: number
        totalPages: number
    }
}

export interface ICustomerResult {
    id: string
    name: string
    createdAt: string
    lastOrderDate: string | null
    totalAmount: number
    lastOrder: IOrderResult | null
    email: string
    orderCount: number
}

export interface IOrderPaginationResult {
    orders: IOrderResult[]
    pagination: {
        currentPage: number
        pageSize: number
        totalOrders: number
        totalPages: number
    }
}

export interface IOrderResult {
    _id: string
    orderNumber: number
    status: keyof typeof FILTER_ORDER_MAP
    totalAmount: number
    products: IProduct[]
    payment: PaymentType
    customer: ICustomer
    deliveryAddress: string
    email: string
    comment: string
    phone: string
    createdAt: string
    updatedAt: string
}
