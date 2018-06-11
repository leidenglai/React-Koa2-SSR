import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 存储ID的序列值
 */

const SequenceSchema = new Schema({
  _id: { type: String, required: true },
  next: { type: Number }
})

SequenceSchema.statics.findAndModify = function(query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback)
}

SequenceSchema.statics.increment = function(schemaName, callback) {
  return this.collection.findAndModify(
    { _id: schemaName },
    [],
    { $inc: { next: 1 } },
    { new: true, upsert: true },
    callback
  )
}

export default mongoose.model('Sequence', SequenceSchema)
