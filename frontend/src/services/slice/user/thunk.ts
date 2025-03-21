import {
    ServerResponse,
    UserLoginBodyDto,
    UserRegisterBodyDto,
    UserResponse,
    UserResponseToken,
} from '@types'
import { setCookie } from '../../../utils/cookie'
import { createAsyncThunk } from '../../hooks'

export const checkUserAuth = createAsyncThunk<UserResponse, void>(
    `user/checkUserAuth`,
    async (_, { extra: api }) => {
        return await api.getUser()
    }
)

export const checkUserRoles = createAsyncThunk<string[], void>(
    `user/checkUserRoles`,
    async (_, { extra: api }) => {
        return await api.getUserRoles()
    }
)

export const registerUser = createAsyncThunk<
    UserResponseToken,
    UserRegisterBodyDto
>(`user/registerUser`, async (dataUser, { extra: api }) => {
    const data = await api.registerUser(dataUser)
    setCookie('accessToken', data.accessToken)
    return data
})

export const loginUser = createAsyncThunk<UserResponseToken, UserLoginBodyDto>(
    `user/loginUser`,
    async (dataUser, { extra: api }) => {
        const data = await api.loginUser(dataUser)
        setCookie('accessToken', data.accessToken)
        return data
    }
)

export const logoutUser = createAsyncThunk<ServerResponse<unknown>, void>(
    `user/logoutUser`,
    async (_, { extra: api }) => {
        const data = await api.logoutUser()
        setCookie('accessToken', '', { expires: new Date(0) })
        setCookie('refreshToken', '', { expires: new Date(0) })
        return data
    }
)
