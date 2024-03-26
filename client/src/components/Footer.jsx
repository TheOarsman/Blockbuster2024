import { useState } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  DropdownButton,
  Modal,
  Button,
} from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../css/footer.css";

const DeveloperModal = ({ developer, onHide }) => {
  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {developer.name}
          <a href={developer.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="footer-icon" />
          </a>
          <a
            href={developer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="footer-icon" />
          </a>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentDeveloper, setCurrentDeveloper] = useState(null);

  const developers = [
    {
      name: "Ethan Wynne",
      github: "https://github.com/ethanfrog",
      linkedin: "https://linkedin.com/in/ethan-wynne-b2a956161",
    },
    {
      name: "Whitney Simpson",
      github: "https://github.com/Whitney-Simpson",
      linkedin: "https://www.linkedin.com/in/whitneysimpson/",
    },
    {
      name: "Heinz Ulrich V",
      github: "https://github.com/TheOarsman",
      linkedin: "https://www.linkedin.com/in/heinz-ulrich-v-3a3486a0/",
    },
    {
      name: "Greg Greve",
      github: "https://github.com/Goobergreve09",
      linkedin: "https://www.linkedin.com/in/gregory-greve-b48463300/",
    },
    {
      name: "Nicholas Eggleston",
      github: "https://github.com/nickegg11",
      linkedin: "https://www.linkedin.com/in/nicholas-eggleston-9780a7270/",
    },
  ];

  const handleShowModal = (developer) => {
    setCurrentDeveloper(developer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDeveloper(null);
  };

  return (
    <footer className="footer">
      <Container fluid>
        <Row style={{ flexWrap: "wrap" }} className="text-center ">
          <Col>
            <Row>
              <Col>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Developers"
                  className="d-flex p-3 "
                >
                  {developers.map((developer, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleShowModal(developer)}
                    >
                      {developer.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
              <Col  md={{ span: 2}} className="d-flex p-3">
                <Row className="feedback">
                  <Col >
                  <Button type="button" variant="danger" href="/feedback">
                    Feedback Link
                  </Button>
                  </Col>
                </Row>
              </Col>

              <div className="">
                <p>&copy; BLOCKBUSTER 2024 &copy; All Rights Reserved</p>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>

      {currentDeveloper && (
        <DeveloperModal
          developer={currentDeveloper}
          onHide={handleCloseModal}
        />
      )}
    </footer>
  );
};

export default Footer;
