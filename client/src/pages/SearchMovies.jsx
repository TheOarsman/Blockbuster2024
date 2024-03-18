import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { handleSearch } from "../utils/movieFetch";

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

      setSearchedMovies(movieData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find((movie) => movie.id === movieId);

    if (!movieToSave) {
      return false;
    }

    try {
      if (!savedMovieIds.includes(movieToSave.id)) {
        setSavedMovieIds((prevSavedMovieIds) => [
          ...prevSavedMovieIds,
          movieToSave.id,
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
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a movie"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : "Search for a movie to begin"}
        </h2>
        <Row>
          {searchedMovies.map((movie) => {
            return (
              <Col md="4" key={movie.id}>
                <Card border="dark">
                  <Button
                    disabled={savedMovieIds.includes(movie.id)}
                    className="btn-block btn-info"
                    onClick={() => handleSaveMovie(movie.id)}
                  >
                    {savedMovieIds.includes(movie.id)
                      ? "This movie has already been saved!"
                      : "Save this Movie!"}
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchMovies;
