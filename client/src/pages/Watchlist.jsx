import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

// Utils and Query imports

import { QUERY_WATCHLIST } from "../utils/queries";
import { removeWatchlistId } from "../utils/localStorage";
import { REMOVE_WATCHLIST } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

// Icon and design imports

import { Container, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaVideo } from "react-icons/fa";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "../css/myFavoritedmovies.css";
import "../css/watchlist.css";

const Watchlist = () => {
  const { loading, data } = useQuery(QUERY_WATCHLIST);
  const [removeMovieMutation] = useMutation(REMOVE_WATCHLIST);
  const [savedWatchlist, setSavedWatchlist] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setSavedWatchlist(data.me.savedWatchlist);
    }
  }, [loading, data]);

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeMovieMutation({
        variables: { movieId: movieId },
      });
      removeWatchlistId(movieId);
      setSavedWatchlist((prevWatchlist) =>
        prevWatchlist.filter((movie) => movie.movieId !== movieId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Container fluid className="full-container-watchlist">
        <Row className="justify-content-center pt-2">
          <Card className="saved-header-card ">
            <Card.Header as="h5">
              {data?.me?.username}'s Current Watchlist
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <h2 className="saved-movie-header">
                  {savedWatchlist.length ? (
                    `Viewing ${savedWatchlist.length} saved ${
                      savedWatchlist.length === 1 ? "movie" : "movies"
                    }:`
                  ) : (
                    <>
                      You have no saved movies.{" "}
                      <Link to="/search-movies">
                        <span className="search-now-hover">Search now!</span>
                      </Link>
                    </>
                  )}
                </h2>
                <Card.Text>
                  <p>Movies are shown in the order they were added</p>
                </Card.Text>
              </Card.Title>
            </Card.Body>
          </Card>
        </Row>
        <Container
          className="movies-container"
          style={{ marginBottom: "200px" }}
        >
          <Row className="movie-row d-flex">
            {savedWatchlist
              .slice()
              .reverse()
              .map((movie) => (
                <Col
                  key={movie.movieId}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                  className="movie-column"
                >
                  <Card border="light" className="mb-4 poster-container">
                    {movie.image && (
                      <div className="card-image-container">
                        <Card.Img
                          src={movie.image}
                          alt={`The cover for ${movie.title}`}
                          variant="top"
                          style={{ height: "400px" }}
                        />
                      </div>
                    )}
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Row>
                        <Col xs={6}>
                          <div className="delete-icon-container">
                            <div className="icon-container justify-content-end">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="delete-icon"
                                onClick={() => handleDeleteMovie(movie.movieId)}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <a
                            href={`https://www.imdb.com/title/${movie.movieId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="imdb-link"
                          >
                            <div className="icon-container">
                              <FaVideo className="video-icon" />
                            </div>
                          </a>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mt-2">
                          <p>
                            Added:{" "}
                            {new Date(movie.createdAt).toLocaleDateString()}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Watchlist;
