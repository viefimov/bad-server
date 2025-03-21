import { IProduct } from '@types'
import clsx from 'clsx'
import { ElementType } from 'react'
import { useLocation } from 'react-router-dom'
import EditIcon from '../../assets/edit.svg?react'
import styles from './card-admin.module.scss'

type CardProps = {
    dataCard: IProduct
    component: ElementType
}

export default function CardAdmin({
    dataCard,
    component: Component = 'div',
}: CardProps) {
    const { image, title, price } = dataCard
    const location = useLocation()
    return (
        <Component
            to={{ pathname: `/admin/edit/${dataCard._id}` }}
            state={{ background: location }}
            className={clsx(styles.card)}
        >
            <img className={styles.card__image} src={image.fileName} alt='' />
            <h2 className={styles.card__title}>{title}</h2>
            {price ? `${price} синапсов` : 'Бесценно'}
            <button className={styles.card__action}>
                <EditIcon />
            </button>
        </Component>
    )
}
