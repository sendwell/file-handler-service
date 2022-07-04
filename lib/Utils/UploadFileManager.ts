import { APIGatewayEvent } from 'aws-lambda';
import { getBoundary, parse } from 'parse-multipart-data'


export default class UploadFileManager {
  // single file upload
  public async extractFile(event: APIGatewayEvent) {
    
    const boundary = getBoundary(event.headers['Content-Type'] || event.headers['content-type'])
    const body = Buffer.from(event.body, 'base64')
    const parts = parse(body, boundary)
    
    const [{filename, data}] = parts
    
    if(!filename || !data)
        throw new Error(`An error in uploading the file occurred`)

    return {
        filename,
        data:  Buffer.from(data)
    }   
  }
}