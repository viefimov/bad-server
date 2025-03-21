import Button from '@components/button'
import Form, { Input } from '@components/form'
import useFormWithValidation from '@components/form/hooks/useFormWithValidation'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useActionCreators } from '../../services/hooks'
import {
    productsActions,
    productsSelector,
} from '../../services/slice/products'
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

export default function AdminEditProduct() {
    const navigate = useNavigate()
    const { editId } = useParams()
    const { updateProduct, deleteProduct, uploadImageFile } =
        useActionCreators(productsActions)
    const currentProduct = useSelector(productsSelector.selectProducts).find(
        (product) => product._id === editId
    )
    const formRef = useRef<HTMLFormElement>(null)
    const { values, handleChange, errors, isValid, setValuesForm } =
        useFormWithValidation<ProductFormValues>(
            { title: '', description: '', price: null },
            formRef.current
        )
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [selectedFile, setSelectedFile] = useState<IFile | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
        null
    )
    const isValidForm = isValid && Boolean(selectedCategory)
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

    useEffect(() => {
        const currentCategory = CATEGORY_TYPES.find(
            (item) => item.title === currentProduct?.category
        )
        if (currentCategory) {
            setSelectedCategory(currentCategory)
        }
        if (currentProduct) {
            setValuesForm({
                description: currentProduct.description,
                price: currentProduct.price,
                title: currentProduct.title,
            })
        }
    }, [currentProduct])

    const handleUpdateProduct = async () => {
        if (!selectedCategory) {
            return
        }
        const dataProduct = {
            ...values,
            category: selectedCategory?.title as keyof typeof CATEGORY_CLASSES,
            image: selectedFile ? selectedFile : undefined,
            price: values.price ? values.price : null,
        }

        editId &&
            updateProduct({ data: dataProduct, id: editId })
                .unwrap()
                .then(() => navigateAdminList())
                .catch((error) => toast.error(error.message))
    }
    const handleFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleUpdateProduct()
    }

    const handleDeleteProduct = () => {
        editId &&
            deleteProduct(editId)
                .unwrap()
                .then(() => navigateAdminList())
                .catch((error) => toast.error(error.message))
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
                label='Заменить изображение'
                accept='image/*,.png,.jpeg,.jpg,.svg'
                fileName={currentProduct?.image.originalName}
            />
            <div className={styles.admin__buttons}>
                <Button type='submit' disabled={!isValidForm}>
                    Сохранить
                </Button>
                <Button
                    onClick={handleDeleteProduct}
                    type='button'
                    extraClass={styles.admin__button_alt}
                >
                    Удалить товар
                </Button>
            </div>
        </Form>
    )
}
