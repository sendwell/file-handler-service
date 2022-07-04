
import Invoke, { LambdaService, EmailMethod } from '../../lib/Lambda/Invoke'

export enum TemplateName {
  Registration = 'Registration',
  ResetPassword = 'ResetPassword',
  ResetPasswordSuccess = 'ResetPasswordSuccess',
  Verification = 'Verification',
}

export type Param = {
  templateName: string,
  subject: string,
  to: string,
  content: any,
}

export default async function sendEmail(param: Param) {
  const { templateName, subject, to, content } = param

  const result = await Invoke({
    service: LambdaService.Email,
    method: EmailMethod.SendEmail,
    payload: {
      body: JSON.stringify({
        templateName,
        subject,
        to,
        content,
      })
    }
  })
  const { body } = result

  return JSON.parse(body)
}

