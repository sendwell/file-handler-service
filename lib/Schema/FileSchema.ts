import * as yup from 'yup'

const FileSchema = yup.object().shape({
  s3_file_path: yup.string().required(),
  file_service_url: yup.string().required(),
  filename: yup.string().required(),
})

export default FileSchema
