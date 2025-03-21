import { combineReducers } from '@reduxjs/toolkit'
import { customersSlice } from '@slices/customers/customers-slice'
import { orderFormSlice } from '@slices/orderForm/order-form-slice'
import { ordersSlice } from '@slices/orders/orders-slice'
import { productsSlice } from '@slices/products/products-slice'
import { profileOrdersSlice } from '@slices/profile-orders/profile-orders-slice'
import { userSlice } from '@slices/user/user-slice'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import basketSlice from './slice/basket'

const persistConfigBasket = {
    key: 'basket',
    storage: storage,
}
const persistConfigOrder = {
    key: 'order',
    storage: storage,
}
const persistedBasketReducer = persistReducer(
    persistConfigBasket,
    basketSlice.reducer
)
const persistedOrderReducer = persistReducer(
    persistConfigOrder,
    orderFormSlice.reducer
)

export const rootReducer = combineReducers({
    [basketSlice.name]: persistedBasketReducer,
    [productsSlice.name]: productsSlice.reducer,
    [orderFormSlice.name]: persistedOrderReducer,
    [userSlice.name]: userSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
    [customersSlice.name]: customersSlice.reducer,
    [profileOrdersSlice.name]: profileOrdersSlice.reducer,
})
