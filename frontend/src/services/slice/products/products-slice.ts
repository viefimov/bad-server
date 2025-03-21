import { RequestStatus } from '@api'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { isActionPending, isActionRejected } from '../../../utils/redux'
import { IProduct, IProductPaginationResult } from '../../../utils/types'
import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from './thunk'
import { TProductState } from './type'

const initialState: TProductState = {
    data: [],
    status: RequestStatus.Idle,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getProducts.fulfilled,
                (
                    state,
                    { payload }: PayloadAction<IProductPaginationResult>
                ) => {
                    state.data = payload.items
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                createProduct.fulfilled,
                (state, { payload }: PayloadAction<IProduct>) => {
                    state.data.push(payload)
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                updateProduct.fulfilled,
                (state, { payload }: PayloadAction<IProduct>) => {
                    state.data = state.data.map((product) =>
                        product._id === payload._id ? payload : product
                    )
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                deleteProduct.fulfilled,
                (state, { payload }: PayloadAction<IProduct>) => {
                    state.data = state.data.filter(
                        (product) => product._id !== payload._id
                    )
                    state.status = RequestStatus.Success
                }
            )
            .addMatcher(isActionPending(productsSlice.name), (state) => {
                state.status = RequestStatus.Loading
            })
            .addMatcher(isActionRejected(productsSlice.name), (state) => {
                state.status = RequestStatus.Failed
            })
    },
    selectors: {
        selectProducts: (state: TProductState) => state.data,
    },
})
