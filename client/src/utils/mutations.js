import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
mutation resetPassword($email:String!){
  resetPassword(email:$email) {
    token
    user{
      _id
      username
      email
    }
  }
}
  `


export const SAVE_MOVIE = gql`
  mutation saveMovie($movieData: MovieInput!) {
    saveMovie(movieData: $movieData) {
      _id
      username
      email
      savedMovies {
        movieId
        title
        image
        movieLength
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: ID!) {
    removeMovie(movieId: $movieId) {
      _id
      username
      email
      savedMovies {
        movieId
        title
        image
        movieLength
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const ADD_WATCHLIST = gql`
  mutation saveWatchlist($movieData: WatchlistInput!) {
    saveWatchlist(movieData: $movieData) {
      _id
      username
      email
      savedWatchlist {
        movieId
        image
        title
        movieLength
        createdAt
      }
    }
  }
`;

export const REMOVE_WATCHLIST = gql`
  mutation removeWatchlist($movieId: ID!) {
    removeWatchlist(movieId: $movieId) {
      _id
      username
      email
      savedWatchlist {
        movieId
        image
        title
        movieLength
        createdAt
      }
    }
  }
`;

