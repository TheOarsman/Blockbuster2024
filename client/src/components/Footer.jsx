import { useState } from "react";
import { Link } from "react-router-dom";

import { Container, Col, Row } from "react-bootstrap";

import "../footer.css";

const Footer = () => {

  return (
    <>
    <footer className="footer">
        <Container fluid>
            {/* Sections for our developer info (GitHub, LinkedIn, some third thing) */}
            <Row>The Developers</Row>
            <Row>
                <Col>
                    Ethan Wynne
                    <ul>
                        <li><a href="https://github.com/ethanfrog">GitHub</a></li>
                        <li><a href="https://www.linkedin.com/in/ethan-wynne-b2a956161/">LinkedIn</a></li>
                        <li></li>
                    </ul>
                </Col>
                <Col>
                    Whitney Simpson
                    <ul>
                        <li><a href="">GitHub</a></li>
                        <li><a href="">LinkedIn</a></li>
                        <li></li>
                    </ul>
                </Col>
                <Col>
                    Heinz Ulrich
                    <ul>
                        <li><a href="">GitHub</a></li>
                        <li><a href="">LinkedIn</a></li>
                        <li></li>
                    </ul>
                </Col>
                <Col>
                    Greg Greve
                    <ul>
                        <li><a href="">GitHub</a></li>
                        <li><a href="">LinkedIn</a></li>
                        <li></li>
                    </ul>
                </Col>
                <Col>
                    Nicholas Eggleston
                    <ul>
                        <li><a href="">GitHub</a></li>
                        <li><a href="">LinkedIn</a></li>
                        <li></li>
                    </ul>
                </Col>
            </Row>
        </Container>
    </footer>
    </>
  );
};

export default Footer;
