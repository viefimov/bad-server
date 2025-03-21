import type { ReactNode } from 'react'
import type { Location } from 'react-router-dom'

import Spinner from '@components/spinner'
import { userSelectors } from '@slices/user'
import { useSelector } from '@store/hooks'
import { Navigate, useLocation } from 'react-router-dom'

type TProtectedRouteProps = {
    children: ReactNode
    onlyUnAuth?: boolean
}

type BackgroundState = {
    background?: Location
}

type FromState = {
    from?: Location & BackgroundState
    background?: Location
}

export default function ProtectedRoute({
    children,
    onlyUnAuth,
}: TProtectedRouteProps) {
    const location: Location<FromState> = useLocation() as Location<FromState>
    const { getIsAuthChecked, getUser } = userSelectors
    const user = useSelector(getUser)
    const isAuthChecked = useSelector(getIsAuthChecked)

    if (!isAuthChecked) {
        console.log('WAIT USER CHECKOUT')
        return <Spinner />
    }

    // Редирект на целевой компонент
    if (onlyUnAuth && user) {
        console.log('NAVIGATE FROM LOGIN TO INDEX/FROM')
        const from = location.state?.from || { pathname: '/' }
        const background = location.state?.from?.background || null
        return <Navigate replace to={from} state={{ background }} />
    }

    // Редирект на страницу логина при отсутствии пользователя в сторе
    if (!onlyUnAuth && !user) {
        console.log('NAVIGATE FROM PAGE TO LOGIN', location)
        return (
            <Navigate
                replace
                to={'/login'}
                state={{
                    from: {
                        ...location,
                        background: location.state?.background,
                    },
                }}
            />
        )
    }

    return children // все хорошо и рендерим компонент
}
