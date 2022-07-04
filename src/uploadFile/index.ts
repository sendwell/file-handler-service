import { APIGatewayEvent } from 'aws-lambda';
import FileManager from '../../lib/Utils/FileManager'
import UploadFileSchema from '../../lib/Schema/UploadFileSchema';
import UploadFileManager from '../../lib/Utils/UploadFileManager'

export default async function uploadToS3(event: APIGatewayEvent) {
  UploadFileSchema.validateSync(event)!
  const fm = new FileManager()
  const ufm = new UploadFileManager()
  const { filename, data } = await ufm.extractFile(event)
  const bucket = 'sendwell-raw-files'

  const addFileResult = await fm.addFile({
    bucket,
    key: filename,
    body: data,
    contentType: 'multipart/form-data',
  }) 

  return {
    addFileResult,
  }
}
