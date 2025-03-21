import { Outlet } from 'react-router-dom'
import styles from './admin.module.scss'
export default function Admin() {
    return (
        <main className={styles.admin__container}>
            <Outlet />;
        </main>
    )
}
