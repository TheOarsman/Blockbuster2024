import { useQuery, useMutation } from "@apollo/client";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { QUERY_MOVIE } from "../utils/queries";
import { removeMovieId } from "../utils/localStorage";
import { REMOVE_MOVIE } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

const MyFavoritedMovies = () => {
  const { loading, data } = useQuery(QUERY_MOVIE);
  const [removeMovieMutation] = useMutation(REMOVE_MOVIE);

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeMovieMutation({
        variables: { movieId: movieId },
      });
      // Upon success, remove movie's id from localStorage
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  const userData = data?.me || {};

  console.log("UserData:", userData);
  console.log("Saved Movies:", userData.savedMovies);

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container fluid className="text-center p-3 bg-light viewing-books">
          <Row className="mb-2">
            <h1>All-Time-Movie Collection for</h1>
          </Row>
          <Row>
            <h4>
              {userData.savedMovies.length > 0 ? (
                <>
                  <span className="italic-view-books">Viewing {userData.savedMovies.length} saved movies for</span>{" "}
                  <Badge bg="primary">{userData.username}</Badge>
                </>
              ) : (
                <>
                  You have no saved movies.{" "}
                  <Link to="/search-movies" className="text-decoration-none">
                    <span className="search-now-hover">Search Now!</span>
                  </Link>
                </>
              )}
            </h4>
          </Row>
        </Container>
      </div>
      <Container style={{ marginBottom: "150px", padding: "10px" }}>
  <Row>
    {userData.savedMovies && userData.savedMovies.length > 0 && userData.savedMovies.map((movie) => (
      <Col key={movie.movieId} md="2">
        <Card border="dark">
          {movie.image ? (
            <Card.Img
              src={movie.image}
              alt={`The cover for ${movie.title}`}
              variant="top"
              style={{ height: "300px"}} // Set maximum height here
            />
          ) : null}
          <Card.Body>
            <Button
              className="btn-block btn-danger"
              onClick={() => handleDeleteMovie(movie.movieId)}
            >
              Delete this Movie!
            </Button>
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

