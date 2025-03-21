import Button from '@components/button/button'
import Form, { Input } from '@components/form'
import useFormWithValidation from '@components/form/hooks/useFormWithValidation'
import { SyntheticEvent, useRef } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useActionCreators } from '../../services/hooks'
import { userActions } from '../../services/slice/user'
import { AppRoute } from '../../utils/constants'
import { RegisterFormValues } from './helpers/types'
import styles from './register-page.module.scss'
export default function RegisterPage() {
    const formRef = useRef<HTMLFormElement>(null)
    const { values, handleChange, errors, isValid } =
        useFormWithValidation<RegisterFormValues>(
            { name: '', password: '', email: '' },
            formRef.current
        )
    const { registerUser } = useActionCreators(userActions)

    const handleFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        registerUser(values)
            .unwrap()
            .catch((err) => {
                toast.error(err.message)
            })
    }

    return (
        <div className={styles.register}>
            <Form
                formRef={formRef}
                handleFormSubmit={handleFormSubmit}
                extraClass={styles.register__container}
            >
                <h1 className={styles.register__title}>Регистрация</h1>
                <Input
                    value={values.name || ''}
                    onChange={handleChange}
                    name='name'
                    type='text'
                    placeholder='Введите имя'
                    label='Имя'
                    required
                    error={errors.name}
                />
                <Input
                    value={values.email || ''}
                    onChange={handleChange}
                    name='email'
                    type='email'
                    placeholder='Введите email'
                    label='Email'
                    required
                    error={errors.email}
                />
                <Input
                    value={values.password || ''}
                    onChange={handleChange}
                    name='password'
                    type='password'
                    placeholder='Введите пароль'
                    label='Пароль'
                    required
                    error={errors.password}
                />

                <Button
                    type='submit'
                    extraClass={styles.register__button}
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </Button>
                <Link to={AppRoute.Login} className={styles.register__link}>
                    Уже есть аккаунт?
                </Link>
            </Form>
        </div>
    )
}
