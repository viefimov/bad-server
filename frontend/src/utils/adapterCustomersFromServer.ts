import { format } from 'date-fns'
import {
    CustomersDataFromServer,
    CustomersDataList,
} from '../services/slice/customers/type'

export function adapterCustomersFromServer(
    customersData: CustomersDataFromServer[]
): CustomersDataList[] {
    return customersData.map((customerFromServer) => ({
        key: customerFromServer.id,
        registrationDate: {
            title: format(new Date(customerFromServer.createdAt), 'dd.MM.yyyy'),
            value: customerFromServer.createdAt,
        },
        lastOrderDate: {
            title: customerFromServer.lastOrderDate
                ? format(
                      new Date(customerFromServer.lastOrderDate),
                      'dd.MM.yyyy'
                  )
                : 'Заказ не совершал',
            value: customerFromServer.lastOrderDate
                ? customerFromServer.lastOrderDate
                : '',
        },
        totalAmount: {
            title:
                customerFromServer.totalAmount > 0
                    ? `${customerFromServer.totalAmount} синапсов`
                    : '',
            value: customerFromServer.totalAmount,
        },
        orderCount: {
            title: `${customerFromServer.orderCount} заказов всего`,
            value: customerFromServer.orderCount,
        },
        lastOrder: customerFromServer.lastOrder
            ? customerFromServer.lastOrder?.products.map(
                  (product) => product.title
              )
            : [],
        /** Не используется в таблице */
        name: {
            title: customerFromServer.name,
            value: customerFromServer.name,
        },
        deliveryAddress: {
            title: customerFromServer.lastOrder?.deliveryAddress
                ? customerFromServer.lastOrder?.deliveryAddress
                : '',
            value: customerFromServer.lastOrder?.deliveryAddress
                ? customerFromServer.lastOrder?.deliveryAddress
                : '',
        },
        contacts: customerFromServer.lastOrder
            ? [
                  customerFromServer.lastOrder.phone,
                  customerFromServer.lastOrder.email,
              ]
            : ['Нет контактов'],
    }))
}
