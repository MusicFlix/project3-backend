const express = require('express')
const passport = require('passport')

// pull in Mongoose model for examples
const Movie = require('../models/movie')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /movies
router.get('/movies', (req, res, next) => {
  // queries to get a genre

  // console.log(req.query.genre)
  // Movie.find({ 'genre': req.query.genre })
  Movie.find()
    .then(movies => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return movies.map(movie => movie.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(movies => res.status(200).json({ movies: movies }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /movies/5a7db6c74d55bc51bdf39793
router.get('/movies/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Movie.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(movie => res.status(200).json({ movie: movie.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /movies
router.post('/movies', (req, res, next) => {
  // set owner of new example to be current user
  // req.body.movie.owner = req.user.id

  Movie.create(req.body.movie)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(movie => {
      res.status(201).json({ movie: movie.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /movies/5a7db6c74d55bc51bdf39793
router.patch('/movies/:id', removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.movie.owner

  Movie.findById(req.params.id)
    .then(handle404)
    .then(movie => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner

      /****************
       * comment back in
       */
      // requireOwnership(req, movie)

      // pass the result of Mongoose's `.update` to the next `.then`
      return movie.updateOne(req.body.movie)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /movies/5a7db6c74d55bc51bdf39793
router.delete('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(handle404)
    .then(movie => {
      // throw an error if current user doesn't own `example`
      // requireOwnership(req, movie)
      // delete the example ONLY IF the above didn't throw
      movie.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
