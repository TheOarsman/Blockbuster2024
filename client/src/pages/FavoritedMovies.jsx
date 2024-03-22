import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

// Utils and Query imports

import { QUERY_MOVIE } from "../utils/queries";
import { removeMovieId } from "../utils/localStorage";
import { REMOVE_MOVIE } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

// Icon and design imports

import { Container, Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaVideo } from "react-icons/fa";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "../styles/myFavoritedmovies.css";

const MyFavoritedMovies = () => {
  const { loading, data } = useQuery(QUERY_MOVIE);
  const [removeMovieMutation] = useMutation(REMOVE_MOVIE);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      // Sort saved movies alphabetically
      const sortedMovies = [...data.me.savedMovies].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setSavedMovies(sortedMovies);
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
      removeMovieId(movieId);
      setSavedMovies(savedMovies.filter((movie) => movie.movieId !== movieId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Container fluid className="full-container">
        <Row>
          <Row className="justify-content-center pt-2">
            <Card className="saved-header-card ">
              <Card.Header as="h5">
               🎬 {data?.me?.username}'s All Time Favorite Movie Collection! 🎬
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <h2 className="saved-movie-header">
                    {savedMovies.length ? (
                      `Viewing ${savedMovies.length} saved ${
                        savedMovies.length === 1 ? "movie" : "movies"
                      }:`
                      
                    ) : (
                      <>
                        You have no saved movies.{" "}
                   
                          <Link to="/search-movies"><span className='search-now-hover'>Search now!</span></Link>
                      
                      </>
                    )}
                  </h2>
                </Card.Title>
              </Card.Body>
            </Card>
          </Row>
          {savedMovies.map((movie) => (
            <Col
              key={movie.movieId}
              md="3"
              className="justify-content-center p-5 "
            >
              <Card border="dark" className="mb-4 poster-container">
                {movie.image && (
                  <div className="card-image-container">
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
                    <Card.Img
                      src={movie.image}
                      alt={`The cover for ${movie.title}`}
                      variant="top"
                      style={{ height: "400px" }}
                    />
                    <div className="delete-icon-container">
                      <div className="icon-container">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="delete-icon"
                          onClick={() => handleDeleteMovie(movie.movieId)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MyFavoritedMovies;
