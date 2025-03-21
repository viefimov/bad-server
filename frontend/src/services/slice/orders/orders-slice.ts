import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { adapterOrderFromServer } from '../../../utils/adapterOrderFromServer'
import { adapterOrdersFromServer } from '../../../utils/adapterOrdersFromServer'
import { IOrderPaginationResult, IOrderResult } from '../../../utils/types'
import { RequestStatus } from '../../../utils/weblarek-api'
import {
    fetchOrdersWithFilters,
    getAllOrders,
    getOrderByNumber,
    updateOrderById,
} from './thunk'
import { FiltersOrder, OrderDataList, TOrdersState } from './type'

const initialState: TOrdersState = {
    orders: [],
    ordersData: [],
    orderSelected: null,
    filters: {
        orderDateFrom: '',
        orderDateTo: '',
        status: '',
        totalAmountFrom: 0,
        totalAmountTo: 0,
        search: '',
    },
    status: RequestStatus.Idle,
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderDataList[]>) => {
            state.orders = action.payload
        },
        updateFilter: (state, action: PayloadAction<Partial<FiltersOrder>>) => {
            state.filters = {
                ...state.filters,
                ...action.payload,
            }
        },
        clearFilters: (state) => {
            state.filters = initialState.filters
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.status = RequestStatus.Loading
            })
            .addCase(
                getAllOrders.fulfilled,
                (state, action: PayloadAction<IOrderPaginationResult>) => {
                    state.ordersData = action.payload.orders
                    state.orders = adapterOrdersFromServer(
                        action.payload.orders
                    )
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                getOrderByNumber.fulfilled,
                (state, action: PayloadAction<IOrderResult>) => {
                    state.orderSelected = adapterOrderFromServer(action.payload)
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                updateOrderById.fulfilled,
                (state, action: PayloadAction<IOrderResult>) => {
                    state.orderSelected = adapterOrderFromServer(action.payload)
                    state.ordersData = state.ordersData.map((order) =>
                        order._id === action.payload._id
                            ? action.payload
                            : order
                    )
                    state.orders = adapterOrdersFromServer(state.ordersData)
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                fetchOrdersWithFilters.fulfilled,
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
        selectOrders: (state: TOrdersState) => state.orders,
        selectFilterOption: (state: TOrdersState) => state.filters,
        selectCountActiveFilter: (state: TOrdersState) => {
            return Object.values(state.filters).filter(
                (value) => value !== '' && value !== 0
            ).length
        },
    },
})
