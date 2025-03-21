import { API_URL, CDN_URL } from '@constants'

import {
    ICustomerPaginationResult,
    ICustomerResult,
    IFile,
    IOrder,
    IOrderPaginationResult,
    IOrderResult,
    IProduct,
    IProductPaginationResult,
    ServerResponse,
    StatusType,
    UserLoginBodyDto,
    UserRegisterBodyDto,
    UserResponse,
    UserResponseToken,
} from '@types'
import { getCookie, setCookie } from './cookie'

export const enum RequestStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Failed = 'failed',
}

export type ApiListResponse<Type> = {
    total: number
    items: Type[]
}

class Api {
    private readonly baseUrl: string
    protected options: RequestInit

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl
        this.options = {
            headers: {
                ...((options.headers as object) ?? {}),
            },
        }
    }

    protected handleResponse<T>(response: Response): Promise<T> {
        return response.ok
            ? response.json()
            : response
                  .json()
                  .then((err) =>
                      Promise.reject({ ...err, statusCode: response.status })
                  )
    }

    protected async request<T>(endpoint: string, options: RequestInit) {
        try {
            const res = await fetch(`${this.baseUrl}${endpoint}`, {
                ...this.options,
                ...options,
            })
            return await this.handleResponse<T>(res)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    private refreshToken = () => {
        return this.request<UserResponseToken>('/auth/token', {
            method: 'GET',
            credentials: 'include',
        })
    }

    protected requestWithRefresh = async <T>(
        endpoint: string,
        options: RequestInit
    ) => {
        try {
            return await this.request<T>(endpoint, options)
        } catch (error) {
            const refreshData = await this.refreshToken()
            if (!refreshData.success) {
                return Promise.reject(refreshData)
            }
            setCookie('accessToken', refreshData.accessToken)
            return await this.request<T>(endpoint, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            })
        }
    }
}

export interface IWebLarekAPI {
    getProductList: (
        filters: Record<string, unknown>
    ) => Promise<IProductPaginationResult>
    getProductItem: (id: string) => Promise<IProduct>
    createOrder: (order: IOrder) => Promise<IOrderResult>
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
    readonly cdn: string

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options)
        this.cdn = cdn
    }

    getProductItem = (id: string): Promise<IProduct> => {
        return this.request<IProduct>(`/product/${id}`, { method: 'GET' }).then(
            (data: IProduct) => ({
                ...data,
                image: {
                    ...data.image,
                    fileName: this.cdn + data.image.fileName,
                },
            })
        )
    }

    getProductList = (
        filters: Record<string, unknown> = {}
    ): Promise<IProductPaginationResult> => {
        const queryParams = new URLSearchParams(
            filters as Record<string, string>
        ).toString()
        return this.request<IProductPaginationResult>(
            `/product?${queryParams}`,
            {
                method: 'GET',
            }
        ).then((data) => ({
            ...data,
            items: data.items.map((item) => ({
                ...item,
                image: {
                    ...item.image,
                    fileName: this.cdn + item.image.fileName,
                },
            })),
        }))
    }

    createOrder = (order: IOrder): Promise<IOrderResult> => {
        return this.requestWithRefresh<IOrderResult>('/order', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('accessToken')}`,
            },
        }).then((data: IOrderResult) => data)
    }

    updateOrderStatus = (
        status: StatusType,
        orderNumber: string
    ): Promise<IOrderResult> => {
        return this.requestWithRefresh<IOrderResult>(`/order/${orderNumber}`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('accessToken')}`,
            },
        })
    }

    getAllOrders = (
        filters: Record<string, unknown> = {}
    ): Promise<IOrderPaginationResult> => {
        const queryParams = new URLSearchParams(
            filters as Record<string, string>
        ).toString()
        return this.requestWithRefresh<IOrderPaginationResult>(
            `/order/all?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            }
        )
    }

    getCurrentUserOrders = (
        filters: Record<string, unknown> = {}
    ): Promise<IOrderPaginationResult> => {
        const queryParams = new URLSearchParams(
            filters as Record<string, string>
        ).toString()
        return this.requestWithRefresh<IOrderPaginationResult>(
            `/order/all/me?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            }
        )
    }

    getOrderByNumber = (orderNumber: string): Promise<IOrderResult> => {
        return this.requestWithRefresh<IOrderResult>(`/order/${orderNumber}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
        })
    }

    getOrderCurrentUserByNumber = (
        orderNumber: string
    ): Promise<IOrderResult> => {
        return this.requestWithRefresh<IOrderResult>(
            `/order/me/${orderNumber}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            }
        )
    }

    loginUser = (data: UserLoginBodyDto) => {
        return this.request<UserResponseToken>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
    }

    registerUser = (data: UserRegisterBodyDto) => {
        return this.request<UserResponseToken>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
    }

    getUser = () => {
        return this.requestWithRefresh<UserResponse>('/auth/user', {
            method: 'GET',
            headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
        })
    }

    getUserRoles = () => {
        return this.requestWithRefresh<string[]>('/auth/user/roles', {
            method: 'GET',
            headers: { Authorization: `Bearer ${getCookie('accessToken')}` },
        })
    }

    getAllCustomers = (
        filters: Record<string, unknown> = {}
    ): Promise<ICustomerPaginationResult> => {
        const queryParams = new URLSearchParams(
            filters as Record<string, string>
        ).toString()
        return this.requestWithRefresh<ICustomerPaginationResult>(
            `/customers?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            }
        )
    }

    getCustomerById = (idCustomer: string) => {
        return this.requestWithRefresh<ICustomerResult>(
            `/customers/${idCustomer}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
            }
        )
    }

    logoutUser = () => {
        return this.request<ServerResponse<unknown>>('/auth/logout', {
            method: 'GET',
            credentials: 'include',
        })
    }

    createProduct = (data: Omit<IProduct, '_id'>) => {
        console.log(data)
        return this.requestWithRefresh<IProduct>('/product', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('accessToken')}`,
            },
        }).then((data: IProduct) => ({
            ...data,
            image: {
                ...data.image,
                fileName: this.cdn + data.image.fileName,
            },
        }))
    }

    uploadFile = (data: FormData) => {
        return this.requestWithRefresh<IFile>('/upload', {
            method: 'POST',
            body: data,
            headers: {
                Authorization: `Bearer ${getCookie('accessToken')}`,
            },
        }).then((data) => ({
            ...data,
            fileName: data.fileName,
        }))
    }

    updateProduct = (data: Partial<Omit<IProduct, '_id'>>, id: string) => {
        return this.requestWithRefresh<IProduct>(`/product/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('accessToken')}`,
            },
        }).then((data: IProduct) => ({
            ...data,
            image: {
                ...data.image,
                fileName: this.cdn + data.image.fileName,
            },
        }))
    }

    deleteProduct = (id: string) => {
        return this.requestWithRefresh<IProduct>(`/product/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getCookie('accessToken')}`,
            },
        })
    }
}

export default new WebLarekAPI(CDN_URL, API_URL)
