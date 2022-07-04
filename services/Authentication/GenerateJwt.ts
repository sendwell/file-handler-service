import Invoke, { LambdaService, AuthenticationMethod } from '../../lib/Lambda/Invoke'

export type Param = {
  user_id: string,
  email: string,
  data: any,
}

export default async function GenerateJwt(param: Param) {
  const { user_id, email, data } = param
  const result = await Invoke({
    service: LambdaService.Authentication,
    method: AuthenticationMethod.GenerateJwt,
    payload: {
      queryStringParameters: {
        user_id,
        email,
      },
      body: JSON.stringify(data),
    },
  })
  const { body } = result

  return JSON.parse(body)
}
