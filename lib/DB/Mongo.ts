import { MongoClient, WithTransactionCallback } from 'mongodb'

const { MONGODB_CONN, MONGODB_DB_NAME } = process.env

export type MongoConfig = {
  connString: string,
  dbName: string,
}

export enum DbCollection {
  User = 'user',
}

export default class Mongo {

  private config: MongoConfig
  private mongoClient: MongoClient

  constructor(config?: MongoConfig) {
    if (config) {
      this.config = config
    } else {
      this.config = {
        connString: MONGODB_CONN || '',
        dbName: MONGODB_DB_NAME || '',
      }
    }
    console.log('constructor')
    console.log(JSON.stringify(this, null, 2))
  }

  async connect() {
    const { connString } = this.config
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    this.mongoClient = await (MongoClient.connect(connString, options))
    return this
  }

  database(dbName?: string) {
    return this.mongoClient.db(dbName || this.config.dbName)
  }

  collection(col: DbCollection) {
    const db = this.database()
    return db.collection(col)
  }

  async transaction(cb: WithTransactionCallback<unknown>) {
    const session = this.mongoClient.startSession()

    try {
      await session.withTransaction(cb);
    } catch (e) {
      console.log(`exception in tranaction: ${JSON.stringify(e.message || e)}`)
    } finally {
      session.endSession()
      await this.mongoClient.close()
    }
  }
}
