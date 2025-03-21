import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { adapterCustomerFromServer } from '../../../utils/adapterCustomerFromServer'
import { adapterCustomersFromServer } from '../../../utils/adapterCustomersFromServer'
import {
    ICustomerPaginationResult,
    ICustomerResult,
} from '../../../utils/types'
import { RequestStatus } from '../../../utils/weblarek-api'
import {
    fetchCustomersWithFilters,
    getAllCustomers,
    getCustomerById,
} from './thunk'
import { CustomersDataList, FiltersCustomers, TCustomersState } from './type'

const initialState: TCustomersState = {
    customers: [],
    customersData: [],
    customerSelected: null,
    filters: {
        registrationDateFrom: '',
        registrationDateTo: '',
        lastOrderDateFrom: '',
        lastOrderDateTo: '',
        totalAmountFrom: 0,
        totalAmountTo: 0,
        orderCountFrom: 0,
        orderCountTo: 0,
        search: '',
    },
    status: RequestStatus.Idle,
}

export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<CustomersDataList[]>) => {
            state.customers = action.payload
        },
        updateFilter: (
            state,
            action: PayloadAction<Partial<FiltersCustomers>>
        ) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = initialState.filters
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCustomers.pending, (state) => {
                state.status = RequestStatus.Loading
            })
            .addCase(
                getAllCustomers.fulfilled,
                (state, action: PayloadAction<ICustomerPaginationResult>) => {
                    state.customersData = action.payload.customers
                    state.customers = adapterCustomersFromServer(
                        action.payload.customers
                    )
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                getCustomerById.fulfilled,
                (state, action: PayloadAction<ICustomerResult>) => {
                    state.customerSelected = adapterCustomerFromServer(
                        action.payload
                    )
                    state.status = RequestStatus.Success
                }
            )
            .addCase(
                fetchCustomersWithFilters.fulfilled,
                (state, action: PayloadAction<ICustomerPaginationResult>) => {
                    state.customersData = action.payload.customers
                    state.customers = adapterCustomersFromServer(
                        action.payload.customers
                    )
                    state.status = RequestStatus.Success
                }
            )
    },

    selectors: {
        selectCustomers: (state: TCustomersState) => state.customers,
        selectFilterOption: (state: TCustomersState) => state.filters,
        selectCountActiveFilter: (state: TCustomersState) => {
            const filter = Object.values(state.filters).filter(
                (value) => value !== '' && value !== 0
            )
            return filter.length
        },
    },
})
