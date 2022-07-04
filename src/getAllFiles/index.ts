import * as yup from 'yup'
import Mongo, { DbCollection } from '../../lib/DB/Mongo'

export const ParamSchema = yup.object({
  keyword: yup.string().default(''),
  type: yup.string(),
  skip: yup.number().required().default(0),
  limit: yup.number().required().default(1000),
})

export default async function getAllFiles(params: any) {
  const { type, skip, limit, keyword } = ParamSchema.validateSync(params || {})!
  const sort = { _id: 1 }

  const mongo = await (new Mongo().connect())
  const dbCollection = mongo.collection(DbCollection.User)
  let filter: any = { $and: [] }

  if (keyword) {
    filter.$and.push({ $text: { $search: keyword } })
  }

  if (type) {
    filter.$and.push({ 'user_info.type': type })
  }

  if (!filter.$and.length) {
    filter = {}
  }

  const totalCountQuery = dbCollection.find(filter).count()
  const recordsQuery = dbCollection
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray()

  const [total_count, records] = await Promise.all([totalCountQuery, recordsQuery])

  return {
    records,
    total_count,
    current_count: records.length,
  }
}
