import clsx from 'clsx'
import {
    DetailedHTMLProps,
    FormHTMLAttributes,
    ReactNode,
    SyntheticEvent,
} from 'react'
import styles from './form.module.scss'

interface FormProps
    extends DetailedHTMLProps<
        FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    > {
    handleFormSubmit?: (e: SyntheticEvent<HTMLFormElement>) => void
    children: ReactNode
    extraClass?: string
    formRef?: React.RefObject<HTMLFormElement>
}

export default function Form({
    handleFormSubmit,
    children,
    extraClass,
    formRef,
    ...props
}: FormProps) {
    return (
        <form
            ref={formRef}
            className={clsx(styles.form, {
                [extraClass as string]: !!extraClass,
            })}
            onSubmit={handleFormSubmit}
            {...props}
        >
            {children}
        </form>
    )
}
