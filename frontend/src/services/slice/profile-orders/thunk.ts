import { IOrderPaginationResult, IOrderResult } from '../../../utils/types'
import { createAsyncThunk } from '../../hooks'

export const getCurrentUserOrders = createAsyncThunk<
    IOrderPaginationResult,
    void
>(
    'profileOrder/getCurrentUserOrders',
    (_, { extra: { getCurrentUserOrders } }) => {
        return getCurrentUserOrders()
    }
)

export const fetchOrdersMeWithFilters = createAsyncThunk<
    IOrderPaginationResult,
    Record<string, unknown>
>(
    'profileOrder/fetchOrdersMeWithFilters',
    (filters, { extra: { getCurrentUserOrders } }) => {
        return getCurrentUserOrders(filters)
    }
)

export const getCurrentUserOrderByNumber = createAsyncThunk<
    IOrderResult,
    string
>(
    'profileOrder/getCurrentUserOrderByNumber',
    (orderNumber, { extra: { getOrderCurrentUserByNumber } }) => {
        return getOrderCurrentUserByNumber(orderNumber)
    }
)
