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
        <Form onSubmit={handleFormSubmit} style={{ textAlign: "center" }}>
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8}>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="md"
                style={{ margin: "0 auto" }}
                placeholder="Search for a movie"
              />
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex justify-content-center align-items-center mb-3"
            >
              <Button type="submit" variant="success" size="lg">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container>
        <Row>
          {searchedMovies.map((movie) => {
            return (
              <Col md="4" key={movie.imdbID}>
                <div className="wrapper">
                  <div className="main_card">
                    <div className="card_left">
                      <div className="card_details">
                        <h1>{movie.Title}</h1>
                        <div className="card_cat">
                          <p className="PG">{movie.Rated}</p>
                          <p className="year">{movie.Year}</p>
                          <p className="genre">{movie.Genre}</p>
                          <p className="time">{movie.Runtime}</p>
                        </div>
                        <p className="disc">{movie.Plot}</p>
                        <div className="card_cat">
                          <p className="year">{movie.Director}</p>
                          <p className="genre">{movie.Actors}</p>
                        </div>
                        <div className="social-btn">
                          <div
                            className="imdb-info"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <button>
                              <i className="fas fa-play"></i> View on IMDB
                            </button>
                            <img src={imdbLogo} alt="IMDB" />
                            <span>{movie.imdbRating}</span>
                            <img src={tomatoesLogo} alt="IMDB" />
                            <span>
                              {getRottenTomatoesRating(movie.Ratings)}
                            </span>
                            <StarIcon
                              onClick={() => handleSaveMovie(movie.imdbID)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card_right">
                      <div className="img_container">
                        <img src={movie.Poster} alt={movie.Title} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchMovies;
