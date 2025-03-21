import { OptionType } from '@constants'
import clsx from 'clsx'
import type { MouseEventHandler } from 'react'
import { useRef, useState } from 'react'
import arrowIcon from '../../assets/dropdown_arrow.svg'
import { useEnterSubmit } from './hooks/useEnterSubmit'
import { useOutsideClickClose } from './hooks/useOutsideClickClose'
import { Option } from './option'
import styles from './select.module.scss'

type SelectProps = {
    selected: OptionType | null
    options: OptionType[]
    placeholder?: string
    onChange?: (selected: OptionType) => void
    onClose?: () => void
    title?: string
    extraClass?: string
}

const Select = (props: SelectProps) => {
    const {
        options,
        placeholder,
        selected,
        onChange,
        onClose,
        title,
        extraClass,
    } = props
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const placeholderRef = useRef<HTMLDivElement>(null)

    useOutsideClickClose({
        isOpen,
        rootRef,
        onClose,
        onChange: setIsOpen,
    })

    useEnterSubmit({
        placeholderRef,
        onChange: setIsOpen,
    })

    const handleOptionClick = (option: OptionType) => {
        setIsOpen(false)
        onChange?.(option)
    }
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((isOpen) => !isOpen)
    }

    return (
        <div className={clsx(styles.container, extraClass && extraClass)}>
            {title && <span className={styles.selectTitle}>{title}</span>}
            <div
                className={styles.selectWrapper}
                ref={rootRef}
                data-is-active={isOpen}
                data-testid='selectWrapper'
            >
                <img
                    src={arrowIcon}
                    alt='иконка стрелочки'
                    className={clsx(styles.arrow, {
                        [styles.arrow_open]: isOpen,
                    })}
                />
                <div
                    className={clsx(styles.placeholder)}
                    data-status={status}
                    data-selected={!!selected?.value}
                    onClick={handlePlaceHolderClick}
                    role='button'
                    tabIndex={0}
                    ref={placeholderRef}
                >
                    {selected?.title || placeholder}
                </div>
                {isOpen && (
                    <ul className={styles.select} data-testid='selectDropdown'>
                        {options
                            .filter(
                                (option) => selected?.value !== option.value
                            )
                            .map((option) => (
                                <Option
                                    key={option.value}
                                    option={option}
                                    onClick={() => handleOptionClick(option)}
                                />
                            ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Select
