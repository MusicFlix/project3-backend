const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  link: {
    type: String
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  owner: {
    type: String
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Movie', movieSchema)
