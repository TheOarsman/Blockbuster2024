import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Modal, Tab } from "react-bootstrap";

import Auth from "../utils/auth";

import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Logo from "../assets/images/BlockbusterNoBackground.png";

import "../css/nav.css";

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    if (expanded) {
    setExpanded(false);
    }
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        expanded={expanded}
        className="custom-navbar d-flex"
      >
        <Navbar.Brand background="dark" as={Link} to="/">
          <img
            src={Logo}
            alt="Blockbuster 2024"
            className="navbar-logo"
            onClick={handleLinkClick}
          />
        </Navbar.Brand>

        <Navbar.Toggle onClick={handleNavbarToggle} />
        <Navbar.Collapse id="navbarCollapse">
          <Nav className="mr-auto ">
            <Nav.Link
              as={NavLink}
              to="/search-books"
              activeclassname="active"
              onClick={handleLinkClick}
            >
              Book Search
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/search-movies"
              activeclassname="active"
              onClick={handleLinkClick}
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
                  onClick={handleLinkClick}
                >
                  Book Collection
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/favorite-movies"
                  activeclassname="active"
                  onClick={handleLinkClick}
                >
                  Favorite Movies
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/watchlist"
                  activeclassname="active"
                  onClick={handleLinkClick}
                >
                  Watchlist
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="/profile"
                  activeclassname="active"
                  onClick={handleLinkClick}
                >
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
