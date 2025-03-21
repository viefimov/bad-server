import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { useActionCreators } from '../../services/hooks'
import { userActions, userSelectors } from '../../services/slice/user'
import { AppRoute } from '../../utils/constants'

export default function AdminPage() {
    const { checkUserRoles } = useActionCreators(userActions)
    const isAdmin = useSelector(userSelectors.isAdmin)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        checkUserRoles().finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate(AppRoute.Main)
        }
    }, [loading, isAdmin, navigate])

    return <Outlet />
}
