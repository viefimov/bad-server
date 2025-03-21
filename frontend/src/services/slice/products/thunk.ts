import { IFile, IProduct, IProductPaginationResult } from '../../../utils/types'
import { createAsyncThunk } from '../../hooks'

export const getProducts = createAsyncThunk<
    IProductPaginationResult,
    Record<string, unknown>
>('products/getProductList', (filters, { extra: { getProductList } }) => {
    return getProductList(filters)
})

export const getProductsWithFilters = createAsyncThunk<
    IProductPaginationResult,
    { page: number; limit: number }
>(
    'products/getProductList',
    ({ page, limit }, { extra: { getProductList } }) => {
        return getProductList({ page, limit })
    }
)

export const getProductById = createAsyncThunk<IProduct, string>(
    'products/getProductById',
    (id, { extra: { getProductItem } }) => {
        return getProductItem(id)
    }
)

export const createProduct = createAsyncThunk<IProduct, Omit<IProduct, '_id'>>(
    'products/createProduct',
    (data, { extra: { createProduct } }) => {
        return createProduct(data)
    }
)

export const uploadImageFile = createAsyncThunk<IFile, FormData>(
    'products/uploadImageFile',
    (data, { extra: { uploadFile } }) => {
        return uploadFile(data)
    }
)

export const updateProduct = createAsyncThunk<
    IProduct,
    { data: Partial<Omit<IProduct, '_id'>>; id: string }
>('products/updateProduct', ({ data, id }, { extra: { updateProduct } }) => {
    return updateProduct(data, id)
})

export const deleteProduct = createAsyncThunk<IProduct, string>(
    'products/deleteProduct',
    (id, { extra: { deleteProduct } }) => {
        return deleteProduct(id)
    }
)
