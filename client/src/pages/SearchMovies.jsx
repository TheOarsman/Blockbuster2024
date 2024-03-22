import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

// import utils

import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { handleSearch } from "../utils/movieFetch";
import Auth from "../utils/auth";
import { SAVE_MOVIE } from "../utils/mutations";

// import Logos and Css
// comment

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

import imdbLogo from "../assets/images/imdbLogo.png";
import tomatoesLogo from "../assets/images/rottenTomatoes.png";
import "@fortawesome/fontawesome-free/css/all.css";
import "../styles/searchMovies.css";

const getRottenTomatoesRating = (ratings) => {
  if (ratings && Array.isArray(ratings)) {
    console.log("All Ratings:", ratings);
    const rottenTomatoesRating = ratings.find(
      (rating) => rating.Source === "Rotten Tomatoes"
    );
    console.log("Rotten Tomatoes Rating:", rottenTomatoesRating);
    return rottenTomatoesRating ? rottenTomatoesRating.Value : "N/A";
  } else {
    return "N/A";
  }
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
      console.log("Fetched movie data response:", movieData[0].Response);

      if (movieData && movieData[0].Response === "True") {
        setSearchedMovies(movieData);
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
      (movie) => movie.imdbID === movieId
    );

    if (!movieToSave) {
      console.error("Movie to save not found.");
      return;
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      const { data } = await saveMovie({
        variables: {
          movieData: {
            movieId: movieToSave.imdbID,
            title: movieToSave.Title || "",
            image: movieToSave.Poster || "",
            movieLength: movieToSave.Runtime || "",
          },
        },
      });

      const updatedSavedMovieIds = [...savedMovieIds, movieToSave.imdbID];
      setSavedMovieIds(updatedSavedMovieIds);

      saveMovieIds(updatedSavedMovieIds);
      console.log("Movie saved successfully:", data);
    } catch (err) {
      console.error("Error saving movie:", err);
    }
  };

  return (
    <><Container fluid className = 'search-background'>
   <Container>
      <Row className='justify-content-center pt-2 pb-4'>
        <Card className="saved-header-card">
          <Card.Header as="h5">Search Movie Collection:</Card.Header>
          <Card.Body>
            <Card.Title>
              <Form onSubmit={handleFormSubmit}>
                <Row className="justify-content-md-center align-items-center">
                  <Col md="auto">
                    <h2>Search Movie Collection:</h2>{" "}
                  </Col>
                  <Col xs lg="3">
                    <Form.Control
                      name="searchInput"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type="text"
                      size="md"
                      className="w-200"
                      placeholder="Search for a movie"
                    />
                  </Col>
                  <Col className="align-items-center" md="auto">
                    <Button
                      type="submit"
                      variant="success"
                      size="lg"
                      className="mt-2"
                    >
                      Search
                    </Button>
                  </Col>
                  <Col xs={12} md="auto" className="text-center mt-2">
                    <h5>
                      {searchedMovies.length > 0
                        ? `Viewing ${searchedMovies.length} ${
                            searchedMovies.length === 1 ? "result" : "results"
                          }`
                        : "While we are busy rewinding your last film, search for another movie."}
                    </h5>
                  </Col>
                </Row>
              </Form>
            </Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>

      <Container className="pt-5 card-margin">
        {searchedMovies.map((movie) => (
          <Card key={movie.imdbID} className="mb-4">
            <CardBody className="movie-card ">
              <Row>
                <Col md="4">
                  <div className="poster">
                    {movie.Poster && (
                      <img src={movie.Poster} alt={movie.Title} />
                    )}
                  </div>
                </Col>
                <Col md="8">
                  <CardTitle className="movie-title" as="h1">
                    {movie.Title}
                  </CardTitle>
                  <Row className="item-row">
                    {movie.Rated && (
                      <Col>
                        <p className="item">Rated: {movie.Rated}</p>
                      </Col>
                    )}
                    <Col>
                      <p className="item">{movie.Year}</p>
                    </Col>
                    {movie.Genre && (
                      <Col>
                        <p className="item">Genre: {movie.Genre}</p>
                      </Col>
                    )}
                    {movie.Runtime && (
                      <Col>
                        <p className="item">Runtime: {movie.Runtime}</p>
                      </Col>
                    )}
                  </Row>
                  {movie.Plot && <p className="plot">{movie.Plot}</p>}
                  <Row>
                    <Col>
                      {movie.Actors && (
                        <p className="item-row">Actors: {movie.Actors}</p>
                      )}
                    </Col>
                  </Row>
                  <Row className="item-row">
                    <Col>
                      {movie.Director && (
                        <p className="item">Directed By: {movie.Director}</p>
                      )}
                    </Col>
                    <Col>
                      {movie.Writer && (
                        <p className="item">Written By: {movie.Writer}</p>
                      )}
                    </Col>
                  </Row>
                  <Row className="p-3 align-items-center icon-row">
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
                      {movie.imdbRating && (
                        <>
                          <img src={imdbLogo} alt="IMDB" />
                          <span>{movie.imdbRating}</span>
                        </>
                      )}
                    </Col>
                    <Col>
                      {movie.Ratings && (
                        <>
                          <img src={tomatoesLogo} alt="Rotten Tomatoes" />
                          <span>{getRottenTomatoesRating(movie.Ratings)}</span>
                        </>
                      )}
                    </Col>
                    <Col>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedMovieIds?.some(
                            (savedMovieId) => savedMovieId === movie.imdbID
                          )}
                          className="btn-block btn-info"
                          onClick={() => handleSaveMovie(movie.imdbID)}
                        >
                          {savedMovieIds?.some(
                            (savedId) => savedId === movie.imdbID
                          )
                            ? "This movie has already been saved!"
                            : "Save this Movie!"}
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Row className="item-row pt-4">
                    <Col>
                      {movie.BoxOffice && (
                        <p className="item">
                          Box Office Sales: {movie.BoxOffice}
                        </p>
                      )}
                    </Col>
                    <Col>
                      {movie.Awards && (
                        <p className="item">Awards: {movie.Awards}</p>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </Container>
      </Container>
    </>
  );
};

export default SearchMovies;
