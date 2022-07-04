import Handler, { EventParam } from '../../lib/Lambda/Handler'
import Result from '../../lib/Response/Result'
import uploadToS3 from '.'

export const handler = Handler(async ({ event, context }: EventParam) => {
  let result: any
  try {
    result = await uploadToS3(event)
    
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
