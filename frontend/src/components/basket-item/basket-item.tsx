import clsx from 'clsx'
import { ElementType } from 'react'
import { IProduct } from '../../utils/types'
import styles from './basket-item.module.scss'
type BasketItemProps = {
    dataProduct: IProduct
    component: ElementType
    index: number
    deleteProductInBasket: (id: string) => void
}
export default function BasketItem({
    dataProduct,
    component: Component,
    index,
    deleteProductInBasket,
}: BasketItemProps) {
    const { title, price, _id } = dataProduct
    return (
        <Component className={clsx(styles.basket__item)}>
            <span className={styles.basket__item_index}>{index}</span>
            <span className={styles.basket__title}>{title}</span>
            <span className={styles.basket__price}>{price} синапсов</span>
            <button
                className={styles.basket__item_delete}
                aria-label='удалить'
                onClick={() => deleteProductInBasket(_id)}
            ></button>
        </Component>
    )
}
