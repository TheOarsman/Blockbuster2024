import { Container, Col, Row } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        {/* Sections for our developer info (GitHub, LinkedIn, some third thing) */}
        <Row className="text-center" style={{ flexWrap: "wrap" }}>
          <Col>
            <Row>
              {/* Developer 1 */}
              <Col>
                <Col>Ethan Wynne</Col>

                <a
                  href="https://github.com/ethanfrog"
                  target="_blank"
                  rel="noreferrer"
                  className="text-light mx-2"
                >
                  <FaGithub className="icon" />
                </a>
                <a
                  href="https://linkedin.com/in/ethan-wynne-b2a956161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaLinkedin className="icon" />
                </a>
              </Col>
              <Col>
                <Col>Whitney Simpson</Col>

                <a
                  href="https://github.com/Whitney-Simpson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaGithub className="icon" />
                </a>

                <a
                  href="https://www.linkedin.com/in/whitneysimpson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaLinkedin className="icon" />
                </a>
              </Col>
              <Col>
                <Col>Heinz Ulrich</Col>

                <a
                  href="https://github.com/TheOarsman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaGithub className="icon" />
                </a>

                <a
                  href="https://www.linkedin.com/in/heinz-ulrich-v-3a3486a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaLinkedin className="icon" />
                </a>
              </Col>
              <Col>
                <Col>Greg Greve</Col>

                <a
                  href="https://github.com/Goobergreve09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaGithub className="icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/greg-greve/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaLinkedin className="icon" />
                </a>
              </Col>
              <Col>
                <Col>Nicholas Eggleston </Col>

                <a
                  href="https://github.com/nickegg11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaGithub className="icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nicholas-eggleston-9780a7270/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light mx-2"
                >
                  <FaLinkedin className="icon" />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="footer-copyright pt-4 ">
          <Col className="d-flex justify-content-center">
            The Developing Community &copy; BLOCKBUSTER 2024 &copy; All Rights
            Reserved
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
