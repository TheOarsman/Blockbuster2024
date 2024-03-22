import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

// import utils

import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { handleSearch } from "../utils/movieFetch";
import Auth from "../utils/auth";
import { SAVE_MOVIE } from "../utils/mutations";

// import Logos and Css

import {
  Container,
  Col,
  Form,
  Button,
  Row,
  Card,
  CardBody,
  CardTitle,
} from "react-bootstrap";
import "../css/searchMovies.css";
import imdbLogo from "../assets/images/imdbLogo.png";
import tomatoesLogo from "../assets/images/rottenTomatoes.png";
import "@fortawesome/fontawesome-free/css/all.css";

const getRottenTomatoesRating = (ratings) => {
  const rottenTomatoesRating = ratings.find(
    (rating) => rating.Source === "Rotten Tomatoes"
  );
  return rottenTomatoesRating ? rottenTomatoesRating.Value : "N/A";
};

const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const movieData = await handleSearch(searchInput);

      if (movieData && movieData.Response === "True") {
        setSearchedMovies([movieData]);
      } else {
        setSearchedMovies([]);
      }

      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find(
      (movie) => movie.movieID === movieId
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await saveMovie({
        variables: {
          movieData: {
            movieId: movieToSave.imdbID, // Ensure movieId is provided
            title: movieToSave.Title || "", // Assuming Title is equivalent to title in the schema
            image: movieToSave.Poster || "", // Assuming Poster is equivalent to image in the schema
            movieLength: movieToSave.Runtime || "", // Assuming Runtime is equivalent to movieLength in the schema
          },
        },
      });

      // Update the savedMovieIds state with the newly saved movie's ID
      const updatedSavedMovieIds = [...savedMovieIds, movieToSave.movieId];
      setSavedMovieIds(updatedSavedMovieIds);

      // Update local storage with the updated savedMovieIds array
      saveMovieIds(updatedSavedMovieIds);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container className="text-center custom-bg">
        <div style={{ display: "block", width: "100vw" }}>
          <Form onSubmit={handleFormSubmit} style={{ textAlign: "center" }}>
            <Row className=" justify-content-md-center align-items-center">
              <Col md="auto">
                <h2>Search Movie Collection:</h2>{" "}
              </Col>
              <Col xs lg="2">
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="md"
                  className="w-100"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col className="align-items-center" md="auto">
                <Button
                  type="submit"
                  variant="success"
                  size="md"
                  className="mb-2 mt-2"
                >
                  Search
                </Button>
              </Col>
              <Col xs={6} className="text-center">
                <h2>
                  {searchedMovies.length > 0
                    ? `Viewing  result for ${searchedMovies
                        .map((movie) => `'${movie.Title}'`)
                        .join(", ")}:`
                    : "While we are busy rewinding your last film, search for another movie."}
                </h2>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>

      <Container className="p-4">
        {searchedMovies.map((movie) => (
          <Card key={movie.imdbID}>
            <CardBody className="movie-card">
              <Row>
                <Col md="4">
                  <div className="poster">
                    <img src={movie.Poster} alt={movie.Title} />
                  </div>
                </Col>
                <Col md="8">
                  <CardTitle className="movie-title" as="h1">
                    {movie.Title}
                  </CardTitle>
                  <Row className="item-row">
                    <Col>
                      <p className="item">{movie.Rated}</p>
                    </Col>
                    <Col>
                      <p className="item">{movie.Year}</p>
                    </Col>
                    <Col>
                      <p className="item">{movie.Genre}</p>
                    </Col>
                    <Col>
                      <p className="item">{movie.Runtime}</p>
                    </Col>
                  </Row>
                  <p className="plot">{movie.Plot}</p>
                  <Row className=" item-row">
                    <Col>
                      <p className="item">Directed By: {movie.Director}</p>
                    </Col>
                    <Col>
                      <p className="item">Written By: {movie.Writer}</p>
                    </Col>
                  </Row>
                  <Row className=" p-3 align-items-center icon-row">
                    <Col>
                      <button>
                        <a
                          href={`https://www.imdb.com/title/${movie.imdbID}/?ref_=fn_al_tt_1`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-play"></i> View on IMDB
                        </a>
                      </button>
                    </Col>
                    <Col>
                      <img src={imdbLogo} alt="IMDB" />

                      <span>{movie.imdbRating}</span>
                    </Col>
                    <Col>
                      <img src={tomatoesLogo} alt="IMDB" />
                      <span>{getRottenTomatoesRating(movie.Ratings)}</span>
                    </Col>
                    <Col>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedMovieIds?.some(
                            (savedMovieId) => savedMovieId === movie.movieId
                          )}
                          className="btn-block btn-info"
                          onClick={() => handleSaveMovie(movie.movieId)}
                        >
                          {savedMovieIds?.some(
                            (savedId) => savedId === movie.movieId
                          )
                            ? "This movie has already been saved!"
                            : "Save this Movie!"}
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Row className="item-row pt-4">
                    <Col>
                      <p className="item">
                        Box Office Sales: {movie.BoxOffice}
                      </p>
                    </Col>
                    <Col>
                      <p className="item"> {movie.Awards}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default SearchMovies;
