import {
    checkUserAuth,
    checkUserRoles,
    loginUser,
    logoutUser,
    registerUser,
} from './thunk'
import { userSlice } from './user-slice'

export const userActions = {
    ...userSlice.actions,
    checkUserAuth,
    registerUser,
    loginUser,
    logoutUser,
    checkUserRoles,
}
export const userSelectors = userSlice.selectors

export type { TUserState } from './type'
