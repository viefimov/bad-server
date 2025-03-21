import Button from '@components/button'
import Form, { Input } from '@components/form'
import useFormWithValidation from '@components/form/hooks/useFormWithValidation'
import { SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useActionCreators } from '../../services/hooks'
import { productsActions } from '../../services/slice/products'
import {
    AppRoute,
    CATEGORY_CLASSES,
    CATEGORY_TYPES,
    OptionType,
} from '../../utils/constants'
import { IFile } from '../../utils/types'
import FileInput from '../form/file-input'
import Select from '../select'
import styles from './admin.module.scss'
import { ProductFormValues } from './helpers/types'

export default function AdminNewProduct() {
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement>(null)
    const { values, handleChange, errors, isValid } =
        useFormWithValidation<ProductFormValues>(
            { title: '', description: '', price: null },
            formRef.current
        )
    const { createProduct, uploadImageFile } =
        useActionCreators(productsActions)
    const fileRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<IFile | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
        null
    )
    const isValidForm =
        isValid && Boolean(selectedFile) && Boolean(selectedCategory)

    const navigateAdminList = () => navigate(AppRoute.Admin)

    const handleFileChange = (e: SyntheticEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            const dataFile = new FormData()
            dataFile.append('file', e.currentTarget.files[0])

            uploadImageFile(dataFile)
                .unwrap()
                .then((data) => {
                    setSelectedFile(data)
                })
        }
    }

    const handleCreateProduct = async () => {
        if (!selectedFile || !selectedCategory) {
            console.log('Не выбран файл или категория')
            return
        }
        const dataProduct = {
            ...values,
            category: selectedCategory?.title as keyof typeof CATEGORY_CLASSES,
            image: selectedFile,
            price: values.price ? values.price : null,
        }
        await createProduct(dataProduct)
            .unwrap()
            .then(() => navigateAdminList())
            .catch((error) => toast.error(error.message))
    }
    const handleFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleCreateProduct()
    }

    return (
        <Form
            formRef={formRef}
            handleFormSubmit={handleFormSubmit}
            encType='multipart/form-data'
        >
            <Input
                value={values.title || ''}
                onChange={handleChange}
                name='title'
                type='text'
                placeholder='Придумайте название'
                label='Название'
                required
                error={errors.title}
            />
            <Select
                options={CATEGORY_TYPES}
                selected={selectedCategory}
                placeholder='Выберите категорию'
                onChange={setSelectedCategory}
            />
            <Input
                value={values.description || ''}
                onChange={handleChange}
                component='textarea'
                name='description'
                placeholder='Введите описание'
                label='Описание'
                required
                error={errors.description}
            />
            <Input
                value={values.price || ''}
                extraClassLabel={styles.label__price}
                onChange={handleChange}
                type='number'
                name='price'
                placeholder='Введите стоимость'
                label='Стоимость (в синапсах)'
                error={errors.description}
            />
            <FileInput
                onChange={handleFileChange}
                extraClass={styles.admin__file}
                inputRef={fileRef}
                label='Загрузить изображение'
                accept='image/*,.png,.jpeg,.jpg,.svg'
            />
            <Button
                type='submit'
                extraClass={styles.admin__button}
                disabled={!isValidForm}
            >
                Сохранить
            </Button>
        </Form>
    )
}
