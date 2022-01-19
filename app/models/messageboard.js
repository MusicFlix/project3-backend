const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  messages: {
    type: String
  }
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Movie', movieSchema)
