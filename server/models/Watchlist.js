const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const watchlistSchema = new Schema({
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
  createdAt : 
  { type : Date,
     default: Date.now 
},

});

module.exports = watchlistSchema;