import rawFileHandler, { ParamSchema } from '.'
import Handler, { EventParam } from '../../lib/Lambda/Handler'
import Result from '../../lib/Response/Result'

export const handler = Handler(async ({ event }: EventParam) => {
	const { body } = event

	let result: any

	try {
		result = await rawFileHandler(ParamSchema.validateSync(body || {})!)  
	} catch (e) {
		return new Result({
			success: false,
			message: e.message,
		})
	}

	return new Result({
		success: true,	
		data: result,
	})
})

