import clsx from 'clsx'

import type { MouseEventHandler } from 'react'
import { useRef } from 'react'

import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit'

import { OptionType } from '@constants'
import styles from './select.module.scss'

type OptionProps = {
    option: OptionType
    onClick: (value: OptionType['value']) => void
}

export const Option = (props: OptionProps) => {
    const {
        option: { value, title },
        onClick,
    } = props
    const optionRef = useRef<HTMLLIElement>(null)

    const handleClick =
        (clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
        () => {
            onClick(clickedValue)
        }

    useEnterOptionSubmit({
        optionRef,
        value,
        onClick,
    })

    return (
        <li
            className={clsx(styles.option)}
            value={value}
            onClick={handleClick(value)}
            tabIndex={0}
            data-testid={`select-option-${value}`}
            ref={optionRef}
        >
            {title}
        </li>
    )
}
