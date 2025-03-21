import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../components/card/card'
import Gallery from '../../components/gallery/gallery'
import { useActionCreators } from '../../services/hooks'
import {
    productsActions,
    productsSelector,
} from '../../services/slice/products'

export default function MainPage() {
    const { getProducts } = useActionCreators(productsActions)
    useEffect(() => {
        getProducts({ limit: 20 })
    }, [])

    const products = useSelector(productsSelector.selectProducts)

    return (
        <Gallery>
            {products.map((product) => (
                <Card key={product._id} dataCard={product} component={Link} />
            ))}
        </Gallery>
    )
}
