import { orderFormSlice } from './order-form-slice'
import { createOrder } from './thunk'

export const orderFormActions = { ...orderFormSlice.actions, createOrder }
export const orderFormSelector = orderFormSlice.selectors

export type { TOrderState } from './type'
