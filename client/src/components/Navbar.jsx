import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import "../styles/nav.css";
import Logo from "../assets/images/BlockbusterNoBackground.png";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img src={Logo} alt="Blockbuster 2024" className="navbar-logo" />
          </Navbar.Brand>
          <div style={{ paddingLeft: "25px", paddingRight: "25px" }}>
            <Navbar.Toggle aria-controls="navbar" />
          </div>
          <Navbar.Collapse id="navbarCollapse">
            <Nav className="mr-auto">
              <Nav.Link
                as={NavLink}
                to="/search-books"
                activeclassname="active"
              >
                Book Search
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/search-movies"
                activeclassname="active"
              >
                Movie Search
              </Nav.Link>
            </Nav>
            <Nav>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/saved-books"
                    activeclassname="active"
                  >
                    Book Collection
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/favorite-movies"
                    activeclassname="active"
                  >
                    Favorite Movies
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/profile" activeclassname="active">
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav className="mr-lg-0">
                  <Nav.Link onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
