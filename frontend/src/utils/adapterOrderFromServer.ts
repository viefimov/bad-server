import { FILTER_ORDER_MAP } from '@constants'
import { OrderDataFromServer } from '@slices/orders/type'
import { format } from 'date-fns'
import { PaymentType, PaymentTypeMap } from '../components/order/helpers/types'

export function adapterOrderFromServer(orderInfo: OrderDataFromServer) {
    return {
        key: orderInfo._id,
        orderNumber: orderInfo.orderNumber,
        orderDate: format(new Date(orderInfo.createdAt), 'dd.MM.yyyy'),
        customer: orderInfo.customer.name,
        comment: orderInfo.comment,
        status: FILTER_ORDER_MAP[orderInfo.status],
        totalAmount: `${orderInfo.totalAmount} синапсов`,
        productNames: orderInfo.products.map((product) => product.title),
        payment: PaymentTypeMap[orderInfo.payment as PaymentType],
        deliveryAddress: orderInfo.deliveryAddress,
    }
}
