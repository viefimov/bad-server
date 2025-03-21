import { profileOrdersSlice } from './profile-orders-slice'

export const profileOrdersActions = { ...profileOrdersSlice.actions }
export const profileOrdersSelector = { ...profileOrdersSlice.selectors }

export type { TProfileOrdersState } from './type'
