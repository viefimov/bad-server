import { Preloader } from '@components/preloader'
import { IProduct } from '@types'
import { useParams } from 'react-router'
import { useSelector } from '../../services/hooks'
import { productsSelector } from '../../services/slice/products'
import Card from '../card/card'

const CardDetails = () => {
    const { cardId } = useParams<{ cardId: string }>()
    const { selectProducts } = productsSelector

    const productData = useSelector(selectProducts).find(
        (item: IProduct) => item._id === cardId
    )

    if (!productData) {
        return <Preloader />
    }

    return <Card dataCard={productData} full component='div' />
}

export default CardDetails
