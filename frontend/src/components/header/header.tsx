import { AppRoute } from '@constants'
import { userSelectors } from '@slices/user'
import { useSelector } from '@store/hooks'
import clsx from 'clsx'
import { Link, useLocation, useMatch } from 'react-router-dom'
import HeaderNavigateAdmin from './header-navigate-admin'
import HeaderNavigateProfile from './header-navigate-profile'
import styles from './header.module.scss'
export default function Header() {
    const user = useSelector(userSelectors.getUser)
    const isAdmin = useMatch('/admin/*')
    const location = useLocation()

    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link className={styles.header__logo} to={AppRoute.Main}>
                    <img
                        className={styles['header__logo-image']}
                        src='/logo.svg'
                        alt='Film! logo'
                    />
                </Link>

                {isAdmin && <HeaderNavigateAdmin />}
                {!isAdmin && <HeaderNavigateProfile />}
                {!user && (
                    <Link
                        to={{ pathname: AppRoute.Login }}
                        className={clsx(
                            styles.header__icon,
                            styles.header__login
                        )}
                    >
                        <span
                            title='Авторизация'
                            className={styles['header__icon-text']}
                        >
                            Войти
                        </span>
                    </Link>
                )}
                {user && (
                    <>
                        <Link
                            to={AppRoute.Logout}
                            title='Выйти'
                            className={clsx(
                                styles.header__icon,
                                styles.header__logout
                            )}
                            state={{ background: { ...location, state: null } }}
                        >
                            <span className={styles['header__icon-text']}>
                                Выйти
                            </span>
                        </Link>
                        <Link
                            title='Перейти в профиль'
                            to={AppRoute.ProfileOrders}
                            onClick={() => {}}
                            className={clsx(
                                styles.header__icon,
                                styles.header__profile
                            )}
                        >
                            <span className={styles['header__icon-text']}>
                                Профиль
                            </span>
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}
