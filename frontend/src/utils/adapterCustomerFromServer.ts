import { format } from 'date-fns'
import { CustomersDataFromServer } from '../services/slice/customers/type'

export function adapterCustomerFromServer(
    customerInfo: CustomersDataFromServer
) {
    return {
        key: customerInfo.id,
        name: customerInfo.name,
        lastOrder: customerInfo.lastOrder?.products.map(
            (product) => product.title
        ),
        registrationDate: format(
            new Date(customerInfo.createdAt),
            'dd.MM.yyyy'
        ),
        lastOrderDate: customerInfo.lastOrderDate
            ? format(new Date(customerInfo.lastOrderDate), 'dd.MM.yyyy')
            : 'Заказ не совершал',
        orderCount: customerInfo.orderCount
            ? customerInfo.orderCount
            : 'Заказов нет',
        contacts: customerInfo.lastOrder
            ? [customerInfo.lastOrder.phone, customerInfo.lastOrder.email]
            : [customerInfo.email],
        totalAmount: customerInfo.totalAmount
            ? `${customerInfo.totalAmount} синапсов`
            : 'Заказов нет',
        deliveryAddress:
            customerInfo.lastOrder?.deliveryAddress || 'Адрес не указан',
    }
}
