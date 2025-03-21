import { productsSlice } from './products-slice'
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
    uploadImageFile,
} from './thunk'

export const productsActions = {
    ...productsSlice.actions,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    uploadImageFile,
}
export const productsSelector = productsSlice.selectors

export type { TProductState } from './type'
