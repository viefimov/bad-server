import clsx from 'clsx'
import { ElementType } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useActionCreators } from '../../services/hooks'
import { basketActions } from '../../services/slice/basket'
import { AppRoute, CATEGORY_CLASSES } from '../../utils/constants'
import { IProduct } from '../../utils/types'
import Button from '../button/button'
import styles from './card.module.scss'
import { useIsBasket } from './hooks/useIsBasket'

type CardProps = {
    dataCard: IProduct
    full?: boolean
    compact?: boolean
    component: ElementType
}

export default function Card({
    dataCard,
    full,
    compact,
    component: Component = 'div',
}: CardProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const { addProductCart } = useActionCreators(basketActions)
    const { category, title, description, price, image, _id } = dataCard
    const isBasket = useIsBasket(_id)

    return (
        <Component
            to={{ pathname: `/product/${dataCard._id}` }}
            state={{ background: location }}
            className={clsx(
                styles.card,
                full && styles.card_full,
                compact && styles.card_compact
            )}
        >
            {!full && (
                <>
                    <span
                        className={clsx(
                            styles.card__category,
                            category && CATEGORY_CLASSES[category]
                        )}
                    >
                        {category}
                    </span>
                    <h2 className={styles.card__title}>{title}</h2>
                </>
            )}
            <img className={styles.card__image} src={image.fileName} alt='' />
            <div className={styles.card__column}>
                {full && (
                    <>
                        <span
                            className={clsx(
                                styles.card__category,
                                category && CATEGORY_CLASSES[category]
                            )}
                        >
                            {category}
                        </span>
                        <h2 className={styles.card__title}>{title}</h2>
                        <p className={styles.card__text}>{description}</p>
                    </>
                )}
                <div className={styles.card__row}>
                    {price && full && (
                        <Button
                            onClick={() => {
                                isBasket
                                    ? navigate(
                                          { pathname: AppRoute.Basket },
                                          {
                                              state: {
                                                  background: {
                                                      ...location,
                                                      pathname: '/',
                                                      state: null,
                                                  },
                                              },
                                              replace: true,
                                          }
                                      )
                                    : addProductCart(dataCard)
                            }}
                        >
                            {!isBasket ? 'В корзину' : 'В корзине'}
                        </Button>
                    )}
                    <span className={styles.card__price}>
                        {price ? `${price} синапсов` : 'Бесценно'}
                    </span>
                </div>
            </div>
        </Component>
    )
}
