import { IProduct } from '@types'
import { RequestStatus } from '../../../utils/weblarek-api'

export type TProductState = {
    data: IProduct[]
    status: RequestStatus
}
