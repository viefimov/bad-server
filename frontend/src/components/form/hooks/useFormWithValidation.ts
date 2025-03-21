import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

interface IUseFormWithValidation<T> {
    values: T
    errors: Partial<T>
    isValid: boolean
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
    resetFrom: (
        newValues?: T,
        newErrors?: Partial<T>,
        newIsValid?: boolean
    ) => void
    setValuesForm: (params: Partial<T>) => void
}

export default function useFormWithValidation<T>(
    defaultValue: T,
    form?: HTMLFormElement | null
): IUseFormWithValidation<T> {
    const [values, setValues] = useState<T>(defaultValue)
    const [errors, setErrors] = useState<Partial<T>>({})
    const [isValid, setIsValid] = React.useState<boolean>(false)

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const input = evt.target
        const value = input.value
        const name = input.name
        setValues({ ...values, [name]: value })
        setErrors({ ...errors, [name]: input.validationMessage })
        const form = input.closest('form')
        setIsValid(!!(form && form.checkValidity()))
    }
    const resetFrom = useCallback(
        (newValues = defaultValue, newErrors = {}, newIsValid = false) => {
            setValues(newValues)
            setErrors(newErrors)
            setIsValid(newIsValid)
        },
        [setValues, setErrors, setIsValid, defaultValue]
    )

    const setValuesForm = useCallback(
        (data: Partial<T>) => {
            setValues({ ...values, ...data })
        },
        [values]
    )

    useEffect(() => {
        setIsValid(!!(form && form.checkValidity()))
    }, [values, setIsValid, form])

    return { values, setValuesForm, handleChange, resetFrom, errors, isValid }
}
