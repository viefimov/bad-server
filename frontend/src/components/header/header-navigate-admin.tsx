import { Link } from 'react-router-dom'
import { AppRoute } from '../../utils/constants'
import styles from './header.module.scss'

export default function HeaderNavigateAdmin() {
    return (
        <div className={styles.header__links}>
            <Link className={styles.header__link} to={AppRoute.AdminCustomers}>
                Пользователи
            </Link>
            <Link className={styles.header__link} to={AppRoute.AdminOrders}>
                Заказы
            </Link>
            <Link className={styles.header__link} to={AppRoute.Admin}>
                Товары
            </Link>
        </div>
    )
}
