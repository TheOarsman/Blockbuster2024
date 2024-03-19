import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieSearch from "../components/MovieSearch";
import BookSearch from "../components/BookSearch";


const Home = () => {
    const LoginButton = () => (
        <Link to="/login">
            <Button variant="primary" size="lg" block>
                Log In
            </Button>
        </Link>
    );
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1 className="text-center my-4">Welcome to Movie/Book Catalog!</h1>
          <p className="text-center">
            Please log in to get started:
          </p>
          <LoginButton />
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Movie Catalog</h2>
          <MovieSearch />
        </Col>
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Book Catalog</h2>
          <BookSearch />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

