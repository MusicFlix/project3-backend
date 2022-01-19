const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  text: {
    type: String
  },
  board: {
    type: String
  },
  owner: {
    type: String
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Message', messageSchema)
