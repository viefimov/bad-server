import clsx from 'clsx'
import React, { DetailedHTMLProps, InputHTMLAttributes, useId } from 'react'
import styles from './file-input.module.scss'
interface FileInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    extraClass?: string
    fileName?: string
    inputRef: React.RefObject<HTMLInputElement>
}

const FileInput = ({
    onChange,
    label,
    fileName,
    extraClass,
    inputRef,
    ...props
}: FileInputProps) => {
    const id = useId()
    return (
        <label htmlFor={id} className={styles.form__field}>
            <input
                id={id}
                ref={inputRef}
                className={clsx(styles.form__file)}
                onChange={onChange}
                type='file'
                {...props}
            />
            <div className={styles.form__buttons}>
                <div role='button' className={clsx(extraClass && extraClass)}>
                    {label}
                </div>

                {inputRef?.current?.files![0] && (
                    <div className={styles.form__filename}>
                        {inputRef?.current?.files[0].name}
                    </div>
                )}
                {!inputRef?.current?.files![0] && (
                    <div className={styles.form__filename}>{fileName}</div>
                )}
            </div>
        </label>
    )
}

export default FileInput
