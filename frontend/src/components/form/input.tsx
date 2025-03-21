import clsx from 'clsx'
import { DetailedHTMLProps, ElementType, InputHTMLAttributes } from 'react'
import styles from './input.module.scss'

interface InputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
    onInput?: (evt: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void
    value: string | number
    label?: string
    extraClass?: string
    extraClassLabel?: string
    error?: string
    component?: ElementType
    mask?: string | Array<string | RegExp>
}

export function Input({
    onChange,
    onInput,
    onBlur,
    value,
    label,
    extraClassLabel,
    placeholder,
    type,
    extraClass,
    error,
    component: Component = 'input',
    ...props
}: InputProps) {
    return (
        <label
            className={clsx(
                styles.form__field,
                extraClassLabel && extraClassLabel
            )}
        >
            {label && (
                <span className={clsx(styles.form__label, styles.modal__title)}>
                    {label}
                </span>
            )}
            <Component
                className={clsx(styles.form__input, extraClass)}
                onInput={onInput}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                type={type}
                placeholder={placeholder}
                {...props}
            />
            {!!error && <div className={styles.form__error}>{error}</div>}
        </label>
    )
}
