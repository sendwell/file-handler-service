import * as yup from 'yup'

const rawFileHandlerSchema = yup.object().shape({
    body: yup.string().nullable().required('File is required.')
})

export default rawFileHandlerSchema