import { IOrderPaginationResult, IOrderResult, StatusType } from '@types'
import { createAsyncThunk } from '../../hooks'

export const getAllOrders = createAsyncThunk<IOrderPaginationResult, void>(
    'orders/getAllOrders',
    (_, { extra: { getAllOrders } }) => {
        return getAllOrders()
    }
)

export const fetchOrdersWithFilters = createAsyncThunk<
    IOrderPaginationResult,
    Record<string, unknown>
>('orders/fetchOrdersWithFilters', (filters, { extra: { getAllOrders } }) => {
    return getAllOrders(filters)
})

export const getOrderByNumber = createAsyncThunk<IOrderResult, string>(
    'orders/getOrderByNumber',
    (orderNumber, { extra: { getOrderByNumber } }) => {
        return getOrderByNumber(orderNumber)
    }
)

export const updateOrderById = createAsyncThunk<
    IOrderResult,
    { status: StatusType; orderNumber: string }
>(
    'orders/updateOrderById',
    ({ status, orderNumber }, { extra: { updateOrderStatus } }) => {
        return updateOrderStatus(status, orderNumber)
    }
)
