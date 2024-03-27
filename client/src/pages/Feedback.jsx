import { useState, useRef } from "react";

import { Form, Row, Container } from "react-bootstrap";
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
    <div>
      <h1 className="text-center">Tell us what you loved or think could be improved</h1>

      <Form ref={form} onSubmit={handleFormSubmit} className="text-center">
        <Container>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label column="lg" lg={2}>
                Full Name
              </Form.Label>

              <Form.Control
                className="text-center"
                value={fullName}
                name="fullName"
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Name"
              />
            </Form.Group>
          </Row>
        </Container>

        <Container>
          <Row>
            <Form.Group className="mb-3" controlId="formHorizontalEmail">
              <Form.Label column="lg" lg={2}>
                Email address
              </Form.Label>

              <Form.Control
                className="text-center"
                value={email}
                name="email"
                onChange={handleInputChange}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Row>
        </Container>

        <Container>
          <Row>
            <Form.Group className="mb-3" controlId="formHorizontalMessage">
              <Form.Label column="lg" lg={2}>
                Leave Message Here
              </Form.Label>

              <Form.Control
                className="text-center"
                value={message}
                name="message"
                onChange={handleInputChange}
                type="text"
                as="textarea"
                placeholder="Message Here"
              />
            </Form.Group>
          </Row>
        </Container>

        <Container>
          <Row>
            <Button  variant="outline-primary" size="lg" type="submit">
              Submit
            </Button>
          </Row>
        </Container>
      </Form>
    </div>
  );
}