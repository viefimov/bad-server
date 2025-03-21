export interface PaymentFormValues {
    address: string
    payment: PaymentType
}

export interface ContactsFormValues {
    email: string
    phone: string
    comment: string
}

export enum PaymentType {
    Card = 'card',
    Online = 'online',
}

export const PaymentTypeMap = {
    [PaymentType.Card]: 'Картой',
    [PaymentType.Online]: 'Онлайн',
}
