import { useState } from "react";
import { Form, Button,Card, Container} from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD} from '../utils/mutations.js'

import "bootstrap/dist/css/bootstrap.min.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  // const [validated] = useState(false);
  const [resetPassword, { error }] = useMutation(RESET_PASSWORD);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
        const {data} = await resetPassword({
            variables: {email}
        });
        const token = data.resetPassword.token
        const link = `http://localhost:3000/reset-password/${token}`
        console.log(link)
        //send password reset email
    }
    catch(err) {
        console.log(err)
    }
    setEmail("")
  };

  return (
    <Container className="home-container align-items-center">
   <Card className="original-site-card">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label  htmlFor="email">Forgot Password</Form.Label>
          <Form.Control
          className="text-center"
            type="text"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!email}
          type="submit"
          variant="success"
        
        >
          Submit
        </Button>
      </Form>
      </Card>
      </Container>
  
  );
};

export default ForgotPassword;