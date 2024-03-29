import AuthService from "./auth";

const handleFetchError = (error) => {
  console.error("Fetch Error:", error);
  // Perform appropriate action based on the error
  // For example, redirect the user to the login page or display an error message
  if (error instanceof TypeError) {
    // Handle network errors
    console.error("Network Error:", error.message);
    // Display an appropriate error message to the user
  } else if (error instanceof SyntaxError) {
    // Handle JSON parsing errors
    console.error("JSON Parsing Error:", error.message);
    // Display an appropriate error message to the user
  } else {
    // Handle other types of errors
    console.error("Unknown Error:", error.message);
    // Display a generic error message to the user
  }
};

// route to get logged in user's info (needs the token)
export const getMe = () => {
  const token = AuthService.getToken();
  console.log("Using token:", token);
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .catch((error) => {
    handleFetchError(error);
  });
};

// save book data for a logged in user
export const saveBook = (bookData) => {
  const token = AuthService.getToken();
  console.log("Using token:", token);
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  })
  .catch((error) => {
    handleFetchError(error);
  });
};

export const saveMovie = (movieData) => {
  const token = AuthService.getToken();
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movieData),
  })
  .catch((error) => {
    handleFetchError(error);
  });
};

export const saveWatchlist = (movieData) => {
  const token = AuthService.getToken();
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movieData),
  })
  .catch((error) => {
    handleFetchError(error);
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId) => {
  const token = AuthService.getToken();
  console.log("Using token:", token);
  return fetch(`/api/users/books/${bookId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  .catch((error) => {
    handleFetchError(error);
  });
};

export const deleteMovie = (movieId) => {
  const token = AuthService.getToken();
  console.log("Using token:", token);
  return fetch(`/api/users/watchlist/${movieId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  .catch((error) => {
    handleFetchError(error);
  });
};

export const removeWatchlist = (movieId) => {
  const token = AuthService.getToken();
  console.log("Using token:", token);
  return fetch(`/api/users/watchlist/${movieId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  .catch((error) => {
    handleFetchError(error);
  });
};

// Make a search to Google Books API
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};