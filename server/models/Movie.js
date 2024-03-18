const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const movieSchema = new Schema({
 plot: {
    type: String,
    required: true,
  },
 
  movieId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  movieLength: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  directors: [
    {
      type: String,
    },
  ],
});

module.exports = movieSchema;