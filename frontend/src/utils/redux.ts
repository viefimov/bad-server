import { AsyncThunk, UnknownAction } from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const hasPrefix = (action: UnknownAction, prefix: string): boolean =>
    action.type.startsWith(prefix)

const isPending = (action: PendingAction): boolean =>
    action.type.endsWith('/pending')

const isFulfilled = (action: FulfilledAction): boolean =>
    action.type.endsWith('/fulfilled')

const isRejected = (action: RejectedAction): boolean =>
    action.type.endsWith('/rejected')

export const isActionPending = (prefix: string) => (action: PendingAction) => {
    return hasPrefix(action, prefix) && isPending(action)
}

export const isActionRejected =
    (prefix: string) => (action: RejectedAction) => {
        return hasPrefix(action, prefix) && isRejected(action)
    }

export const isActionFulfilled =
    (prefix: string) => (action: FulfilledAction) => {
        return hasPrefix(action, prefix) && isFulfilled(action)
    }
