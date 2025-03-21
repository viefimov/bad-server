import { IProduct } from '../../../utils/types'

export interface ProductFormValues
    extends Pick<IProduct, 'title' | 'description' | 'price'> {}
