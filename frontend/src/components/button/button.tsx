import clsx from 'clsx'
import {
    AriaAttributes,
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    ElementType,
    ReactNode,
} from 'react'
import { LinkProps } from 'react-router-dom'
import styles from './button.module.scss'

interface ButtonProps
    extends DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >,
        AriaAttributes,
        Partial<Pick<LinkProps, 'to' | 'state' | 'replace'>> {
    children: ReactNode
    onClick?: () => void
    component?: ElementType
    extraClass?: string
}
export default function Button({
    children,
    onClick,
    disabled,
    component: Component = 'button',
    extraClass,
    ...props
}: ButtonProps) {
    return (
        <Component
            className={clsx(styles.button, extraClass && extraClass)}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </Component>
    )
}
