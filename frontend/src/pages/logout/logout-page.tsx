import Button from '@components/button/button'
import Form from '@components/form'
import { SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActionCreators } from '../../services/hooks'
import { userActions } from '../../services/slice/user'
import styles from './logout-page.module.scss'
export default function LogoutPage() {
    const { logoutUser, resetUser } = useActionCreators(userActions)
    const navigate = useNavigate()
    const handleFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        logoutUser()
            .unwrap()
            .then(() => resetUser())
    }

    return (
        <div className={styles.logout}>
            <h1 className={styles.login__title}>
                Хотите покинуть личный кабинет?
            </h1>
            <Form
                handleFormSubmit={handleFormSubmit}
                extraClass={styles.logout__container}
            >
                <Button type='submit' extraClass={styles.logout__button}>
                    Да, именно
                </Button>
                <Button
                    type='button'
                    extraClass={styles.logout__button_secondary}
                    onClick={() => navigate(-1)}
                >
                    Остаться
                </Button>
            </Form>
        </div>
    )
}
