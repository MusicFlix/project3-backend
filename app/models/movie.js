const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  image: {
    type: String
  },
  link: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  messageBoard: {
    type: String
  },
  owner: {
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
