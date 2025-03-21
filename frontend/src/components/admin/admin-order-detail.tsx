import OpenInNewIcon from '@assets/open_in_new.svg?react'
import Button from '@components/button'
import DetailInfo from '@components/detail-info'
import { OrderData } from '@slices/orders/type'
import { useActionCreators, useDispatch, useSelector } from '@store/hooks'
import { StatusType } from '@types'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { selectOrderByNumber } from '../../services/selector'
import { ordersActions } from '../../services/slice/orders'
import { getOrderByNumber } from '../../services/slice/orders/thunk'
import { adapterOrderFromServer } from '../../utils/adapterOrderFromServer'
import { Preloader } from '../preloader'
import styles from './admin.module.scss'

const ActionsButton = () => {
    const number = useParams().number || ''
    const navigate = useNavigate()
    const { updateOrderById } = useActionCreators(ordersActions)
    const handleUpdateOrder = (status: StatusType) => {
        updateOrderById({ status, orderNumber: number })
        navigate(-1)
    }
    return (
        <>
            <Button
                extraClass={styles.admin__button_secondary}
                onClick={() => handleUpdateOrder(StatusType.Cancelled)}
            >
                Отменить
            </Button>
            <Button
                extraClass={styles.admin__button_secondary}
                onClick={() => handleUpdateOrder(StatusType.Delivering)}
            >
                Доставить
            </Button>
            <Button
                extraClass={styles.admin__button_secondary}
                onClick={() => handleUpdateOrder(StatusType.Completed)}
            >
                Завершить
            </Button>
        </>
    )
}

export default function AdminOrderDetail() {
    const navigate = useNavigate()
    const number = useParams().number || ''
    const dispatch = useDispatch()
    const orderData = useSelector(selectOrderByNumber(+number))

    useEffect(() => {
        if (!orderData) {
            dispatch(getOrderByNumber(number))
        }
    }, [dispatch, orderData, number])

    const orderHeaders = useMemo(
        () => [
            {
                key: 'customer',
                label: 'Покупатель',
                render: (dataInfo: OrderData) => (
                    <div className={styles.admin__gridCell}>
                        <span>{dataInfo.customer}</span>
                        <OpenInNewIcon
                            onClick={() =>
                                navigate(`/admin/customer/${dataInfo.key}`)
                            }
                        />
                    </div>
                ),
            },
            { key: 'payment', label: 'Способ оплаты' },
            {
                key: 'deliveryAddress',
                label: 'Адрес доставки',
                extraClass: styles.admin__gridRowFullWidth,
            },
            {
                key: 'status',
                label: 'Статус заказа',
                render: (dataInfo: OrderData) => (
                    <span
                        className={clsx({
                            [styles[orderData!.status]]: dataInfo.status,
                        })}
                    >
                        {dataInfo.status}
                    </span>
                ),
            },
            { key: 'totalAmount', label: 'Сумма заказа' },
            {
                key: 'comment',
                label: 'Комментарий к заказу',
                extraClass: styles.profile__gridRowFullWidth,
                render: (dataInfo: OrderData) => (
                    <>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: dataInfo.comment,
                            }}
                        />
                    </>
                ),
            },
            {
                key: 'productNames',
                label: 'Товары',
                render: (dataInfo: OrderData) => (
                    <ul className={styles.admin__dataList}>
                        {dataInfo.productNames.map(
                            (element: string, idx: number) => (
                                <li key={idx}>{element}</li>
                            )
                        )}
                    </ul>
                ),
                extraClass: styles.admin__gridRowFullWidth,
            },
        ],
        [orderData]
    )

    if (!orderData) {
        return <Preloader />
    }

    return (
        <DetailInfo
            header={`Заказ № ${orderData.orderNumber}`}
            subheader={`от ${format(new Date(orderData.createdAt), 'dd.MM.yyyy')}`}
            data={adapterOrderFromServer(orderData)}
            headers={orderHeaders}
            actions={[ActionsButton]}
        />
    )
}
