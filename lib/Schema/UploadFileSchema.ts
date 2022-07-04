import * as yup from 'yup'

const UploadFileSchema = yup.object().shape({
  body: yup.string().nullable().required('File is required.'),
})

export default UploadFileSchema
