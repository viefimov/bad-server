import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from '../../services/hooks'
import { basketSelector } from '../../services/slice/basket'
import { AppRoute } from '../../utils/constants'
import styles from './header.module.scss'

export default function HeaderNavigateProfile() {
    const location = useLocation()
    const { selectBasketTotalCount } = basketSelector
    const basketItemsCount = useSelector(selectBasketTotalCount)
    return (
        <>
            <Link
                title='Перейти в корзину'
                to={{ pathname: AppRoute.Basket }}
                state={{
                    background: {
                        ...location,
                        pathname: AppRoute.Main,
                        state: null,
                    },
                }}
                className={clsx(styles.header__icon, styles.header__basket)}
            >
                <span className={styles['header__icon-text']}>Корзина</span>
                <span className={styles['header__basket-counter']}>
                    {basketItemsCount}
                </span>
            </Link>
        </>
    )
}
