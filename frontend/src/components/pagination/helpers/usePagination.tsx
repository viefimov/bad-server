import { AsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from '@store/hooks'
import { RootState } from '@store/store'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface PaginationResult<_, U> {
    data: U[]
    totalPages: number
    currentPage: number
    limit: number
    nextPage: () => void
    prevPage: () => void
    setPage: (page: number) => void
    setLimit: (limit: number) => void
}

const usePagination = <T, U>(
    asyncAction: AsyncThunk<T, Record<string, unknown>, any>,
    selector: (state: RootState) => U[],
    defaultLimit: number
): PaginationResult<T, U> => {
    const dispatch = useDispatch()
    const data = useSelector(selector)
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPages, setTotalPages] = useState<number>(1)

    const currentPage = Math.min(
        Number(searchParams.get('page')) || 1,
        totalPages
    )

    const limit = Number(searchParams.get('limit')) || defaultLimit

    const fetchData = async (params: Record<string, any>) => {
        const response: any = await dispatch(asyncAction(params))
        setTotalPages(response.payload.pagination.totalPages)
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries())
        fetchData({ ...params, page: currentPage, limit }).then(() => {
            if (data.length === 0 && currentPage > 1) {
                setPage(1)
            }
        })
    }, [currentPage, limit, searchParams])

    const updateURL = (newParams: Record<string, any>) => {
        3
        const updatedParams = new URLSearchParams(searchParams)
        Object.entries(newParams).forEach(([key, value]) => {
            if (value !== undefined) {
                updatedParams.set(key, value.toString())
            } else {
                updatedParams.delete(key)
            }
        })
        setSearchParams(updatedParams)
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            updateURL({ page: currentPage + 1, limit })
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            updateURL({ page: currentPage - 1, limit })
        }
    }

    const setPage = (page: number) => {
        const newPage = Math.max(1, Math.min(page, totalPages))
        updateURL({ page: newPage, limit })
    }

    const setLimit = (newLimit: number) => {
        updateURL({ page: 1, limit: newLimit }) // При изменении лимита возвращаемся на первую страницу
    }

    return {
        data,
        totalPages,
        currentPage,
        limit,
        nextPage,
        prevPage,
        setPage,
        setLimit,
    }
}

export default usePagination
