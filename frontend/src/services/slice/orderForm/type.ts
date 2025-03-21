import { IOrder } from '@types'
import { RequestStatus } from '../../../utils/weblarek-api'

export type TOrderState = {
    info: IOrder
    status: RequestStatus
}
