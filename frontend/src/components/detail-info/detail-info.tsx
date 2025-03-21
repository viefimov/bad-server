import clsx from 'clsx'
import React from 'react'
import styles from './detail-info.module.scss'
export interface DataItem {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

interface Header {
    key: string
    label: string
    extraClass?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (data: any) => JSX.Element
}

interface DetailInfoProps {
    header: string
    subheader: string
    data: DataItem
    headers: Header[]
    actions: React.ComponentType[]
}
export default function DetailInfo({
    header,
    subheader,
    data,
    headers,
    actions,
}: DetailInfoProps) {
    return (
        <div className={styles.detailInfo}>
            <h1 className={styles.detailInfo__title}>{header}</h1>
            <p className={styles.detailInfo__subtitle}>{subheader}</p>
            <div className={styles.detailInfo__container}>
                {headers.map((header) => (
                    <div
                        key={header.key}
                        className={clsx(
                            styles.detailInfo__item,
                            header.extraClass
                        )}
                    >
                        <div className={styles.detailInfo__itemWrap}>
                            <span className={styles.detailInfo__itemTitle}>
                                {header.label}:
                            </span>

                            {header.render ? (
                                header.render(data)
                            ) : (
                                <span className={styles.detailInfo__itemValue}>
                                    {data[header.key]}{' '}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                <div className={styles.detailInfo__actions}>
                    {actions.map((ActionComponent, actionIndex) => (
                        <ActionComponent key={actionIndex} />
                    ))}
                </div>
            </div>
        </div>
    )
}
