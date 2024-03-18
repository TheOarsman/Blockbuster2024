const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
    savedMovies: [Movie]
    movieCount: Int 
  }

  type Book {
    _id: ID!
   authors: [String]
   description: String!
   bookId: String!
   image: String
   link: String
   title: String!
  }

  type Movie {
    _id: ID!
    title: String!
    poster_url: String!
    movieId: String!
    movieLength: String!
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
  }


  type Mutation {
   addUser(username: String!, email: String!, password: String!): Auth
   login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
