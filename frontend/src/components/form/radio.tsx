import clsx from 'clsx'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './radio.module.scss'

interface InputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    label?: string
    extraClass?: string
}

export function Radio({
    onChange,
    value,
    label,
    type,
    extraClass,
    ...props
}: InputProps) {
    return (
        <label className={styles.form__field}>
            <input
                className={clsx(styles.form__radio)}
                onChange={onChange}
                value={value}
                type={type}
                {...props}
            />
            <div className={clsx(extraClass && extraClass)}>{label}</div>
        </label>
    )
}
