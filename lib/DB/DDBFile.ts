import { DynamoDB } from 'aws-sdk'
import Config from '../Constants/Config'


const { Converter } = DynamoDB
const { marshall, unmarshall } = Converter

type DDBFileConstruct = {
  tableName?: string,
  region?: string,
}

export default class DDBFile {
  private table: string
  private ddb: DynamoDB
  private dataset: string = 'uploaded'

  constructor(config?: DDBFileConstruct) {
    const { tableName, region} = config || {}
    this.ddb = new DynamoDB({
      apiVersion: Config.AWS_API_VERSION,
      region: region || Config.REGION
    })
    this.table = tableName || Config.DDB_TABLE
  }
}
