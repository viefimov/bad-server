import { RequestStatus } from '@api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PaymentType } from '../../../components/order/helpers/types'
import { IOrder } from '../../../utils/types'
import { createOrder } from './thunk'
import { TOrderState } from './type'

const initialState: TOrderState = {
    info: {
        address: '',
        payment: PaymentType.Card,
        phone: '',
        total: 0,
        email: '',
        items: [],
    },
    status: RequestStatus.Idle,
}

export const orderFormSlice = createSlice({
    name: 'order-form',
    initialState,
    reducers: {
        setItems: (
            state: TOrderState,
            { payload }: PayloadAction<{ items: string[]; total: number }>
        ) => {
            state.info = {
                ...state.info,
                items: payload.items,
                total: payload.total,
            }
        },
        setInfo: (state, { payload }: PayloadAction<Partial<IOrder>>) => {
            state.info = { ...state.info, ...payload }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = RequestStatus.Loading
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.status = RequestStatus.Success
            })
            .addCase(createOrder.rejected, (state) => {
                state.status = RequestStatus.Failed
            })
    },
    selectors: {
        selectOrderInfo: (state: TOrderState) => state.info,
    },
})
