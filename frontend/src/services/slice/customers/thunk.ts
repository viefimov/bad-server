import { ICustomerPaginationResult, ICustomerResult } from '@types'
import { createAsyncThunk } from '../../hooks'

export const getAllCustomers = createAsyncThunk<
    ICustomerPaginationResult,
    void
>('customers/getAllCustomers', (_, { extra: { getAllCustomers } }) => {
    return getAllCustomers()
})

export const fetchCustomersWithFilters = createAsyncThunk<
    ICustomerPaginationResult,
    Record<string, unknown>
>(
    'customers/fetchOrdersWithFilters',
    (filters = {}, { extra: { getAllCustomers } }) => {
        return getAllCustomers(filters)
    }
)

export const getCustomerById = createAsyncThunk<ICustomerResult, string>(
    'order/getCustomerById',
    (customerID, { extra: { getCustomerById } }) => {
        return getCustomerById(customerID)
    }
)
