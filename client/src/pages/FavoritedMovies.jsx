// MyFavoritedMovies.jsx

import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { getMe, deleteMovie } from "../utils/API";
import Auth from "../utils/auth";
import { removeMovieId } from "../utils/localStorage";

const MyFavoritedMovies = () => {
  const [userData, setUserData] = useState({});

  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error("something went wrong!");
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedMovies && userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved movies!"}
        </h2>
        <Row>
          {userData.savedMovies &&
            userData.savedMovies.map((movie) => {
              return (
                <Col key={movie.id} md="4">
                  <Card border="dark">
                    {movie.image ? (
                      <Card.Img
                        src={movie.image}
                        alt={`The cover for ${movie.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteMovie(movie.id)}
                      >
                        Delete this Movie!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default MyFavoritedMovies;
