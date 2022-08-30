
const { env } = process
const { LOG_LEVEL, STAGE, REGION, DDB_TABLE, AWS_API_VERSION, KMS_KEY_ID } = env

const Config = {
  LOG_LEVEL: LOG_LEVEL || 'silly',
  STAGE: STAGE || 'dev',
  REGION: REGION || 'us-east-2',
  DDB_TABLE: DDB_TABLE || `template-service-${STAGE}`,
  AWS_API_VERSION: AWS_API_VERSION || '2012-08-10',
  KMS_KEY_ID: KMS_KEY_ID || '26fa0003-57fa-4b21-90a3-f978f10096a1',
}

export default Config
