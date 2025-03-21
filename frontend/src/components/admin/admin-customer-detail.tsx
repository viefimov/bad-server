import Button from '@components/button'
import DetailInfo from '@components/detail-info'
import { format } from 'date-fns'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from '../../services/hooks'
import { selectCustomerById } from '../../services/selector'
import { getCustomerById } from '../../services/slice/customers/thunk'
import { CustomersData } from '../../services/slice/customers/type'
import { adapterCustomerFromServer } from '../../utils/adapterCustomerFromServer'
import { Preloader } from '../preloader'
import styles from './admin.module.scss'

const CloseButton = () => {
    const navigate = useNavigate()
    return <Button onClick={() => navigate(-1)}>Понятно!</Button>
}

export default function AdminCustomerDetail() {
    const customerId = useParams().customerId || ''
    const customerData = useSelector(selectCustomerById(customerId))
    const dispatch = useDispatch()
    console.log(customerData)

    useEffect(() => {
        if (!customerData) {
            dispatch(getCustomerById(customerId))
        }
    }, [dispatch, customerData, customerId])

    const orderHeaders = useMemo(
        () => [
            {
                key: 'lastOrder',
                label: 'Последний заказ',
                render: (dataInfo: CustomersData) => (
                    <ul className={styles.admin__dataList}>
                        {dataInfo.lastOrder ? (
                            dataInfo.lastOrder.map(
                                (element: string, idx: number) => (
                                    <li key={idx}>{element}</li>
                                )
                            )
                        ) : (
                            <span>Заказ не найден</span>
                        )}
                    </ul>
                ),
            },
            {
                key: 'orderCount',
                label: 'Всего заказов',
            },

            { key: 'totalAmount', label: 'Общая сумма заказов' },
            {
                key: 'contacts',
                label: 'Контакты',
                render: (dataInfo: CustomersData) => (
                    <ul className={styles.admin__dataList}>
                        {dataInfo.contacts.map(
                            (element: string, idx: number) => (
                                <li key={idx}>{element}</li>
                            )
                        )}
                    </ul>
                ),
            },
            {
                key: 'deliveryAddress',
                label: 'Адрес доставки',
                extraClass: styles.admin__gridRowFullWidth,
            },
        ],
        []
    )

    if (!customerData) {
        return <Preloader />
    }

    return (
        <DetailInfo
            header={`${customerData.name}`}
            subheader={`Дата регистрации ${format(new Date(customerData.createdAt), 'dd.MM.yyyy')}`}
            data={adapterCustomerFromServer(customerData)}
            headers={orderHeaders}
            actions={[CloseButton]}
        />
    )
}
