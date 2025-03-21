import { Outlet } from 'react-router-dom'
import styles from './profile.module.scss'
export default function Profile() {
    return (
        <main className={styles.profile__container}>
            <Outlet />;
        </main>
    )
}
