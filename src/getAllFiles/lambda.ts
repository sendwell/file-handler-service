import Handler, { EventParam } from '../../lib/Lambda/Handler'
import Result from '../../lib/Response/Result'

import getAllFiles, { ParamSchema } from '.'

export const handler = Handler(async ({ event }: EventParam) => {
  const { queryStringParameters } = event
  const param = ParamSchema.validateSync(queryStringParameters || {})!
  
  let result: any
  
  try {
    result = await getAllFiles(param)
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

