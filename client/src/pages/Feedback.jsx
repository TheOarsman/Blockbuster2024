import { useState, useRef } from "react";

import { Form, Row, Container, Card, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import emailjs from "@emailjs/browser";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const handleInputChange = (e) => {
    console.log(e.target.value);
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === "email") {
      setEmail(inputValue);
    } else if (inputType === "fullName") {
      setFullName(inputValue);
    } else {
      setMessage(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_yvc70er", "template_eyj1nxh", form.current, {
        publicKey: "C4slU0J9dmIQcFs_4",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    setFullName("");
    setMessage("");
    setEmail("");
  };

  return (
<Container fluid className="d-flex justify-content-center feedback-container">
  <Card className=" flex-column mt-3 feedback-card" style={{ width: '70%' }}>
    <Card.Header className="text-center">Feedback Form</Card.Header>
    <Card.Title className="text-center p-4 feedbackTitle">Tell us what we can improve on or change and our developers will get back to you momentarily. We appreciate your feedback and patience.</Card.Title>

    <Form ref={form} onSubmit={handleFormSubmit} className="feedback-form">
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form.Label><h5>Full Name</h5></Form.Label>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form.Control
            className="text-center feedback-input"
            value={fullName}
            name="fullName"
            onChange={handleInputChange}
            type="text"
            placeholder="Enter Name"
            style={{ width: '70%' }}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form.Label className="mb-2"><h5>Email address</h5></Form.Label>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form.Control
            className="text-center feedback-input"
            value={email}
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="Enter email"
            style={{ width: '70%' }}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form.Label className="text-center mb-2"><h5>Message</h5></Form.Label>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form.Control
            className="text-center p-3 feedback-textarea"
            value={message}
            name="message"
            onChange={handleInputChange}
            type="text"
            as="textarea"
            placeholder="Write your Message..."
            style={{ width: '70%' }}
          />
        </Col>
      </Row>

      <Row className="mb-3 text-center">
        <Col>
          <Button variant="outline-primary" size="lg" type="submit" className="w-25 feedback-btn">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  </Card>
</Container>


  );
}