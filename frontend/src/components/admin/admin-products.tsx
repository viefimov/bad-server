import Button from '@components/button'
import CardAdmin from '@components/card-admin'
import { productsSelector } from '@slices/products'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'
import { getProducts } from '../../services/slice/products/thunk'
import { AppRoute } from '../../utils/constants'
import { IProduct, IProductPaginationResult } from '../../utils/types'
import Pagination from '../pagination'
import usePagination from '../pagination/helpers/usePagination'
import styles from './admin.module.scss'
export default function AdminProducts() {
    const location = useLocation()
    // const products = useSelector(productsSelector.selectProducts);
    const {
        data: products,
        totalPages,
        currentPage,
        limit,
        nextPage,
        prevPage,
    } = usePagination<IProductPaginationResult, IProduct>(
        getProducts,
        productsSelector.selectProducts,
        5
    )
    console.log(products)

    return (
        <main className={clsx(styles.admin__products, styles.admin__container)}>
            <div className={styles.admin__header}>
                <h1 className={styles.admin__title}>Товары</h1>
                <Button
                    extraClass={styles.admin__button}
                    component={Link}
                    to={{ pathname: AppRoute.AddProduct }}
                    state={{ background: location }}
                    replace
                >
                    Добавить товар
                </Button>
            </div>
            <div className={styles.admin__productsList}>
                {products.map((product) => (
                    <CardAdmin
                        key={product._id}
                        dataCard={product}
                        component={Link}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                onNextPage={nextPage}
                onPrevPage={prevPage}
            />
        </main>
    )
}
