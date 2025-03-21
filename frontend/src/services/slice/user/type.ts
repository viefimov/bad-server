import { IUser } from '../../../utils/types'
import { RequestStatus } from '../../../utils/weblarek-api'

export type TUserState = {
    isAuthChecked: boolean
    data: IUser | null
    roles: string[]
    requestStatus: RequestStatus
}
