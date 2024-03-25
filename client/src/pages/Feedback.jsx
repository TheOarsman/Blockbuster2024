import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export default function Contact() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();

  const handleInputChange = (e) => {
    console.log(e.target.value)
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
    .sendForm('service_yvc70er', 'template_eyj1nxh', form.current, {
      publicKey: 'C4slU0J9dmIQcFs_4',
    })
    .then(
      () => {
        console.log('SUCCESS!');
      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
    setFullName('');
    setMessage('');
    setEmail('');
  };
  return (
    <div>
      <h1>Contact Page</h1>
      <Form ref={form} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
           value={fullName}
           name="fullName"
           onChange={handleInputChange}
          type="text" 
          placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Leave Message Here</Form.Label>
          <Form.Control 
           value={message}
           name="message"
           onChange={handleInputChange}
          type="text" 
          as="textarea" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
