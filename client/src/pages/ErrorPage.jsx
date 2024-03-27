import blockbusterLogo from "../assets/images/BlockbusterOriginalLogo.png";

import { Container, Col, Row } from "react-bootstrap";
import "../css/ErrorPage.css";

const ErrorPage = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center errorPage"
    >
      <div className="text-center">
        <Row>
          <Col>
            <img
              src={blockbusterLogo}
              alt="Blockbuster Logo"
              className="img-fluid blockbuster-logo-small"
            />
          </Col>
        </Row>

        <Row>
          <p className="error-page-message">
            Sorry for the inconvenience, we are still working on rewinding your
            movie.
          </p>
        </Row>

        <Row>
          <a href="/" className="error-page-link">
            Go to Home Page
          </a>
        </Row>
      </div>
    </Container>
  );
};

export default ErrorPage;