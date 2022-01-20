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
  owner: {
    type: String
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Movie', movieSchema)
