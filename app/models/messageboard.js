const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  messages: {
    type: String
  },
  link: {
    type: String,
    required: true
  },
  messageBoard: {
    type: String
  }
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('Movie', movieSchema)
