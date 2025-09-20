const mongoose = require('mongoose')

const connectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  status: {
    type: String,
    enum: {
      values: ['ignored','interested','accepted','rejected'],
      message: '{VALUE} is not a valid status type'
    }
  }
})

const Connection = mongoose.model('Connection', connectionSchema)

module.exports = {Connection}