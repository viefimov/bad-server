import { ordersSlice } from './orders-slice'
import {
    fetchOrdersWithFilters,
    getAllOrders,
    getOrderByNumber,
    updateOrderById,
} from './thunk'

export const ordersActions = {
    ...ordersSlice.actions,
    updateOrderById,
    getAllOrders,
    getOrderByNumber,
    fetchOrdersWithFilters,
}
export const ordersSelector = ordersSlice.selectors

export type { TOrdersState } from './type'
