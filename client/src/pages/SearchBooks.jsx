import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import getRandomMessage from "../utils/randomMessage";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";

import bookImage from "../assets/images/noWifibook.png";

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
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

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveBook({
        variables: { bookData: { ...bookToSave } },
        description: bookToSave.description || "",
      });
      console.log(savedBookIds);
      console.log(data);
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
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
                <h2>Search Book Collection:</h2>{" "}
              </Col>
              <Col xs lg="2">
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="md"
                  className="w-100"
                  placeholder="Search for a book"
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
                  {searchedBooks.length ? (
                    `Viewing ${searchedBooks.length} results:`
                  ) : (
                    <span>
                      {getRandomMessage()}
                      <img
                        src={bookImage}
                        alt="Book"
                        style={{ width: "60px", paddingLeft: "10px" }}
                      />{" "}
                      Search our Book Collection
                    </span>
                  )}
                </h2>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>

      <Container style={{ marginBottom: "150px" }}>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId} style={{ paddingTop: "25px" }}>
                <Card className="card-box-shadow " border="dark">
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
    </>
  );
};

export default SearchBooks;
