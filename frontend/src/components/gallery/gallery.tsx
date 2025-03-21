import { PropsWithChildren } from 'react'
import styles from './gallery.module.scss'
export default function Gallery({ children }: PropsWithChildren) {
    return <main className={styles.gallery}>{children}</main>
}
