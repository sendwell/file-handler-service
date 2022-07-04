import Invoke, { LambdaService, AuthenticationMethod } from '../../lib/Lambda/Invoke'

export type Param = {
  jwt: string,
}

export default async function InvalidateSession(param: Param) {
  const { jwt } = param
  const result = await Invoke({
    service: LambdaService.Authentication,
    method: AuthenticationMethod.InvalidateSession,
    payload: {
      body: JSON.stringify({ jwt }),
    },
  })
  const { body } = result

  return JSON.parse(body)
}
