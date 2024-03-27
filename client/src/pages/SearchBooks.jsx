import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import getRandomMessage from "../utils/randomMessage";
import { SAVE_BOOK } from "../utils/mutations";

import blockbusterLogo from "../assets/images/BlockbusterOriginalLogo.png";

import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import "../css/searchBooks.css";

const SearchBooks = () => {
  // Create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // Create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // Create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // Create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // Create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // Find the book in `searchedBooks` state by the matching ID
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBook({
        variables: {
          bookData: {
            ...bookToSave,
            description: bookToSave.description || "", // Include description field
          },
        },
      });
      console.log(savedBookIds);
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container fluid className="search-background-books">
        <Container>
          <Row className="justify-content-center pt-2 pb-4">
            <Card className="saved-header-card">
              <Card.Header as="h5">
                <img
                  src={blockbusterLogo}
                  alt="Blockbuster Logo"
                  style={{ width: "50px", marginRight: "10px" }}
                />
                Blockbuster Book Catalog
              </Card.Header>

              <Card.Body>
                <Card.Title>
                  <Form
                    onSubmit={handleFormSubmit}
                    style={{ textAlign: "center" }}
                  >
                    <Row className="justify-content-md-center align-items-center">
                      <Col md="auto">
                        <h2>Search Book Collection:</h2>{" "}
                      </Col>

                      <Col xs lg="3">
                        <Form.Control
                          name="searchInput"
                          value={searchInput}
                          onChange={(e) => setSearchInput(e.target.value)}
                          type="text"
                          size="md"
                          className="w-200"
                          placeholder="Search for a book"
                        />
                      </Col>

                      <Col className="align-items-center" md="auto">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          className="mb-2 mt-2"
                        >
                          Search
                        </Button>
                      </Col>

                      <Col xs={12} md="auto" className="text-center mt-2">
                        <h5>
                          {searchedBooks.length ? (
                            `Viewing ${searchedBooks.length} results:`
                          ) : (
                            <span>
                              {getRandomMessage()} Search our Book Collection
                            </span>
                          )}
                        </h5>
                      </Col>
                    </Row>
                  </Form>
                </Card.Title>
              </Card.Body>
            </Card>
          </Row>
        </Container>

        <Container
          className="bookSearch-margin"
          style={{ marginBottom: "250px" }}
        >
          <Row>
            {searchedBooks.map((book) => {
              return (
                <Col
                  className="p-4"
                  md="4"
                  key={book.bookId} // Ensure each key is unique
                  style={{ paddingTop: "25px" }}
                >
                  <Card className="card-box-shadow-books " border="light">
                    {book.image ? (
                      <Card.Img
                        src={book.image}
                        alt={`The cover for ${book.title}`}
                        variant="top"
                      />
                    ) : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className="small">Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedBookIds?.some(
                            (savedBookId) => savedBookId === book.bookId
                          )}
                          className="btn-block btn-info"
                          onClick={() => handleSaveBook(book.bookId)}
                        >
                          {savedBookIds?.some(
                            (savedId) => savedId === book.bookId
                          )
                            ? "This book has already been saved!"
                            : "Save this Book!"}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default SearchBooks;
