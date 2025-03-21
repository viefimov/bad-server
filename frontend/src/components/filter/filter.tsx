import { useCallback, useEffect, useRef, useState } from 'react'
import { FiltersCustomers } from '../../services/slice/customers/type'
import { FiltersOrder } from '../../services/slice/orders/type'
import { FILTER_ORDER_TYPES, FilterType } from '../../utils/constants'
import Button from '../button/button'
import Form, { Input } from '../form'
import useFormWithValidation from '../form/hooks/useFormWithValidation'
import Select from '../select'
import styles from './filter.module.scss'
import { FieldOption } from './helpers/types'

interface Field {
    name?: string
    label: string
    type?: FilterType
    options?: FieldOption[]
}
interface FilterSelectedState {
    [key: string]: FieldOption
}
interface FilterComponentProps {
    fields: Field[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilter: (filters: Record<string, any>) => void
    onClear: () => void
    defaultValue?: FiltersOrder | FiltersCustomers
}

const Filter = ({
    fields,
    onFilter,
    defaultValue,
    onClear,
}: FilterComponentProps) => {
    const formRef = useRef<HTMLFormElement>(null)

    const { values, handleChange } = useFormWithValidation(
        defaultValue,
        formRef.current
    )
    const [selects, setSelects] = useState<FilterSelectedState>({})

    const renderController = useCallback(
        (field: Field) => {
            {
                if (!field.type) {
                    return (
                        <label
                            key={field.label}
                            className={styles.filter__labelFullWidth}
                        >
                            {field.label}
                        </label>
                    )
                }
                switch (field.type) {
                    case FilterType.select:
                        return (
                            field.options && (
                                <Select
                                    title={field.label}
                                    extraClass={styles.filter__select}
                                    key={field.name}
                                    options={field.options}
                                    selected={selects[field.name!] || null}
                                    placeholder='Выберите статус'
                                    onChange={(option) =>
                                        setSelects({
                                            ...selects,
                                            [field.name!]: option,
                                        })
                                    }
                                />
                            )
                        )
                    case FilterType.text:
                    case FilterType.date:
                    case FilterType.number:
                        return (
                            <Input
                                key={field.name}
                                value={
                                    values![
                                        field.name as keyof typeof values
                                    ] || ''
                                }
                                onChange={handleChange}
                                type={field.type}
                                name={field.name}
                                extraClassLabel={styles.filter__label}
                                extraClass={styles.filter__input}
                                label={field.label}
                            />
                        )
                    default:
                        return null
                }
            }
        },
        [selects, handleChange, values]
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onFilter({ ...values, ...selects })
    }

    useEffect(() => {
        if ((defaultValue as FiltersOrder)?.status) {
            const status = FILTER_ORDER_TYPES.find(
                (item) => item.value === (defaultValue as FiltersOrder)?.status
            )
            if (status) {
                setSelects({ ...selects, status })
            }
        }
    }, [defaultValue])

    return (
        <Form
            formRef={formRef}
            handleFormSubmit={handleSubmit}
            extraClass={styles.filter}
        >
            {fields.map((field) => renderController(field))}
            <Button type='submit'>Применить</Button>
            <Button
                type='button'
                extraClass={styles.filter__button_alt}
                onClick={onClear}
            >
                Очистить
            </Button>
        </Form>
    )
}

export default Filter
