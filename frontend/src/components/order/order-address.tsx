import { useLocation, useNavigate } from 'react-router-dom'

import Button from '@components/button'
import { useEffect, useRef } from 'react'
import { useActionCreators, useSelector } from '../../services/hooks'
import {
    orderFormActions,
    orderFormSelector,
} from '../../services/slice/orderForm'
import { AppRoute } from '../../utils/constants'
import Form, { Input } from '../form'
import useFormWithValidation from '../form/hooks/useFormWithValidation'
import { Radio } from '../form/radio'
import { PaymentFormValues, PaymentType } from './helpers/types'
import styles from './order.module.scss'

export function OrderAddress() {
    const location = useLocation()
    const navigate = useNavigate()
    const { selectOrderInfo } = orderFormSelector
    const orderPersistData = useSelector(selectOrderInfo)
    const { setInfo } = useActionCreators(orderFormActions)
    const formRef = useRef<HTMLFormElement | null>(null)
    const { values, handleChange, errors, isValid, setValuesForm } =
        useFormWithValidation<PaymentFormValues>(
            {
                address: '',
                payment: PaymentType.Online,
            },
            formRef.current
        )

    useEffect(() => {
        setValuesForm({
            address: orderPersistData.address,
            payment: PaymentType.Online,
        })
    }, [orderPersistData])

    const nextStep = () => {
        setInfo(values)
        navigate(
            { pathname: AppRoute.OrderContacts },
            {
                state: {
                    background: { ...location, pathname: '/', state: null },
                },
            }
        )
    }

    return (
        <Form formRef={formRef}>
            <div className={styles.order__field}>
                <div className={styles.order__buttons}>
                    <Radio
                        onChange={handleChange}
                        checked={values.payment === PaymentType.Online}
                        value={PaymentType.Online}
                        label='Онлайн'
                        type='radio'
                        name='payment'
                        extraClass={styles.order__button_alt}
                        required
                    />
                    <Radio
                        onChange={handleChange}
                        checked={values.payment === PaymentType.Card}
                        value={PaymentType.Card}
                        label='При получении'
                        type='radio'
                        name='payment'
                        extraClass={styles.order__button_alt}
                        required
                    />
                </div>
            </div>
            <Input
                value={values.address || ''}
                onChange={handleChange}
                name='address'
                type='text'
                placeholder='Введите адрес'
                label='Адрес доставки'
                required
                minLength={1}
                error={errors.address}
            />
            <div className={styles.order__buttons}>
                <Button type='submit' onClick={nextStep} disabled={!isValid}>
                    Далее
                </Button>
            </div>
        </Form>
    )
}
