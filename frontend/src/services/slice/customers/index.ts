import { customersSlice } from './customers-slice'

export const customersActions = { ...customersSlice.actions }
export const customersSelector = customersSlice.selectors

export type { TCustomersState } from './type'
