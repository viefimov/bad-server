import clsx from 'clsx'
import React from 'react'
import ArrowPaginateIcon from '../../assets/arrow_right.svg?react'
import styles from './pagination.module.scss'
interface PaginationProps {
    currentPage: number
    totalPages: number
    limit: number
    onLimitChange?: (limit: number) => void
    onNextPage: () => void
    onPrevPage: () => void
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    limit,
    onLimitChange,
    onNextPage,
    onPrevPage,
}) => {
    return (
        <div className={styles.container}>
            <button
                onClick={onPrevPage}
                className={clsx(styles.buttonAction)}
                disabled={currentPage === 1}
            >
                <ArrowPaginateIcon
                    className={clsx(
                        styles.icon,
                        styles.iconLeft,
                        currentPage === 1 && styles.disabled
                    )}
                />
            </button>
            <span className={clsx(styles.pages)}>
                {currentPage} из {totalPages}
            </span>
            <button
                onClick={onNextPage}
                className={clsx(styles.buttonAction)}
                disabled={currentPage === totalPages}
            >
                <ArrowPaginateIcon
                    className={clsx(
                        styles.icon,
                        currentPage === totalPages && styles.disabled
                    )}
                />
            </button>
            {onLimitChange && (
                <select
                    value={limit}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    style={{ marginLeft: '20px' }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            )}
        </div>
    )
}

export default Pagination
