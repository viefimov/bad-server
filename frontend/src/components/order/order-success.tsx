import { Link, Navigate, useLocation } from 'react-router-dom'
import { AppRoute } from '../../utils/constants'
import Button from '../button/button'
import styles from './order.module.scss'

export function OrderSuccess() {
    const location = useLocation()
    const orderResponse = location.state?.orderResponse

    if (!orderResponse) {
        return <Navigate to={AppRoute.Main} replace />
    }
    return (
        <div className={styles.order__success}>
            <h2 className={styles.order__title}>Заказ оформлен</h2>
            <p className={styles.order__description}>
                Списано {orderResponse?.total} синапсов
            </p>
            <Button component={Link} to={{ pathname: AppRoute.Main }} replace>
                За новыми покупками!
            </Button>
        </div>
    )
}
