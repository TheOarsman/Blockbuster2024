const { Schema } = require("mongoose");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  poster_url: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  movieLength: {
    type: String,
    required: true,
  },
});

module.exports = movieSchema;
