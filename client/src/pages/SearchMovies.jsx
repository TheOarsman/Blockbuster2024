import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Row } from "react-bootstrap";
import StarIcon from "../components/StarIcon";

import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { handleSearch } from "../utils/movieFetch";

import "../searchMovies.css";
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

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  }, [savedMovieIds]);

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
      (movie) => movie.imdbID === movieId
    );

    if (!movieToSave) {
      return false;
    }

    try {
      if (!savedMovieIds.includes(movieToSave.imdbID)) {
        setSavedMovieIds((prevSavedMovieIds) => [
          ...prevSavedMovieIds,
          movieToSave.imdbID,
        ]);
        alert("Movie saved successfully!");
      } else {
        alert("This movie is already saved!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save the movie. Please try again later.");
    }
  };

  return (
    <>
      <Container className="text-center custom-bg">
        <div style={{ display: "block", width: "100vw" }}>
          <Form onSubmit={handleFormSubmit} style={{ textAlign: "center" }}>
            <Row className=" justify-content-md-center align-items-center">
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
              <Col md="auto">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="mb-4"
                >
                  Search
                </Button>
              </Col>
              <Col xs={6} className="text-center">
                <h2>
                  {searchedMovies.length > 0 ? (
                    `Viewing  result for ${searchedMovies
                      .map((movie) => `'${movie.Title}'`)
                      .join(", ")}:`
                  ) : (
                    "While we are busy rewinding your last film, search for another movie."
                  )}
                </h2>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>

      <Container>
        <Row>
          {searchedMovies.map((movie) => (
            <Col md="4" key={movie.imdbID}>
              <div className="custom-card">
                <h1 className="title">{movie.Title}</h1>
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
                <Row className="item-row">
                  <Col>
                    <p className="item">Directed By: {movie.Director}</p>
                  </Col>
                  <Col>
                    <p className="item">Written By: {movie.Writer}</p>
                  </Col>
                </Row>
                <div className="social-btn">
                  <div className="imdb-info">
                    <button>
                      <i className="fas fa-play"></i> View on IMDB
                    </button>
                    <img src={imdbLogo} alt="IMDB" />
                    <span>{movie.imdbRating}</span>
                    <img src={tomatoesLogo} alt="IMDB" />
                    <span>{getRottenTomatoesRating(movie.Ratings)}</span>
                    <StarIcon
                      onClick={() => handleSaveMovie(movie.imdbID)}
                    />
                  </div>
                </div>
                <div className="column">
                  {/* Box office information */}
                </div>
                <Row>
                  <Col md={{ span: 4, offset: 4 }}>
                    <div className="poster">
                      <img src={movie.Poster} alt={movie.Title} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchMovies;

