import { Link } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";

import { removeBookId } from "../utils/localStorage";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "../css/savedBooks.css";

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeBookMutation({
        variables: { bookId: bookId },
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    }
    catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  const userData = data?.me || {};
  console.log(userData.savedBooks);
  console.log(userData);

  return (
    <>
      <Container fluid className="background-image">
        <Container>
          <Row>
            <Row className="justify-content-center pt-2 pb-4">
              <Card className="saved-header-card ">
                <Card.Header as="h5">
                  {data?.me?.username}'s Blockbuster Book Collection
                </Card.Header>

                <Card.Body>
                  <Card.Title>
                    <h2>
                      {userData.savedBooks && userData.savedBooks.length > 0 ? (
                        <>
                     {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
                        </>
                      ) : (
                        <>
                          You have no saved books.{" "}
                          <Link
                            to="/search-books"
                            className="text-decoration-none"
                          >
                            <span className="search-now-hover">
                              Search Now!
                            </span>
                          </Link>
                        </>
                      )}
                    </h2>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Row>
          </Row>
        </Container>

        <Container style={{ marginBottom: "300px", padding: "10px" }}>
          <Row className="p-5 bookRow">
            {userData.savedBooks.map((book) => {
              return (
                <Col md="4" className="p-3" key={book.bookId}>
                  <Card className="book-card" border="light">
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
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteBook(book.bookId)}
                      >
                        Delete this Book!
                      </Button>
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

export default SavedBooks;