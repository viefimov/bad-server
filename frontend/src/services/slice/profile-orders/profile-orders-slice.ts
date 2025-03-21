import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IOrderPaginationResult, IOrderResult } from '@types'
import { adapterOrderFromServer } from '../../../utils/adapterOrderFromServer'
import { adapterOrdersFromServer } from '../../../utils/adapterOrdersFromServer'
import { RequestStatus } from '../../../utils/weblarek-api'
import { OrderDataList } from '../orders/type'
import {
    fetchOrdersMeWithFilters,
    getCurrentUserOrderByNumber,
    getCurrentUserOrders,
} from './thunk'
import { TProfileOrdersState } from './type'

const initialState: TProfileOrdersState = {
    orders: [],
    ordersData: [],
    orderSelected: null,
    status: RequestStatus.Idle,
}

export const profileOrdersSlice = createSlice({
    name: 'profile-orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderDataList[]>) => {
            state.orders = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentUserOrders.pending, (state) => {
                state.status = RequestStatus.Loading
            })
            .addCase(
                getCurrentUserOrders.fulfilled,
                (state, action: PayloadAction<IOrderPaginationResult>) => {
                    state.ordersData = action.payload.orders
                    state.orders = adapterOrdersFromServer(
                        action.payload.orders
                    )
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                getCurrentUserOrderByNumber.fulfilled,
                (state, action: PayloadAction<IOrderResult>) => {
                    state.orderSelected = adapterOrderFromServer(action.payload)
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                fetchOrdersMeWithFilters.fulfilled,
                (state, action: PayloadAction<IOrderPaginationResult>) => {
                    state.ordersData = action.payload.orders
                    state.orders = adapterOrdersFromServer(
                        action.payload.orders
                    )
                    state.status = RequestStatus.Success
                }
            )
    },
    selectors: {
        selectProfileOrders: (state: TProfileOrdersState) => state.orders,
    },
})
