import { IOrder, IOrderResult } from '../../../utils/types'
import { createAsyncThunk } from '../../hooks'

export const createOrder = createAsyncThunk<IOrderResult, IOrder>(
    'order/createOrder',
    (orderData, { extra: { createOrder } }) => {
        return createOrder(orderData)
    }
)
