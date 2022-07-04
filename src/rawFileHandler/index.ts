import { InferType, object, string } from 'yup'
import ConvertFileToJson from '../../lib/Utils/ConvertFileToJson'
import FileManager from '../../lib/Utils/FileManager'

export const ParamSchema = object({
	bucket: string().required().default('sendwell-raw-files'),
	key: string().required(),
})

export default async function rawFileHandler(param: InferType<typeof ParamSchema>) {
	const fm = new FileManager()
	const converter = new ConvertFileToJson()

	const { bucket, key} = param
	try {
		const result = await fm.getRawFile({
			bucket,
			key
		})

		const response = await converter.parseCsvToJson(result)
		console.log(response);
		
		return response

	} catch (e) {
		throw new Error('error ' + e.message)
	}
}