import { useState, useEffect } from "react";

import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";

import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import MemberCardLogIn from "./MemberCardLogIn";

import "../css/membercard.css";
import "../pages/ForgotPassword";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { error }] = useMutation(LOGIN);

  // Settings for barcode generation are based on username input
  const [paddedUsername, setPaddedUsername] = useState("");
  useEffect(() => {
    setPaddedUsername(
      userFormData.username ? userFormData.username.padEnd(20, ".") : ""
    );
  }, [userFormData.username]);

  // Sets the "User Since" date on MemberCard
  const memberSince = new Date(Date.now()).toLocaleDateString();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className="membership-card mb-3">
        <MemberCardLogIn
          username={userFormData.username}
          email="me@example.com"
          paddedUsername={paddedUsername}
          memberSince={memberSince}
        />
      </div>

      <br></br>

      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        <div style={{ display: 'flex',  alignItems: 'center' }}>
  <Button
    disabled={!(userFormData.username && userFormData.password)}
    type="submit"
    variant="success"
    className="m-3"
  >
    Submit
  </Button>
  <div>
    <a href="/forgotpassword" className="forgot-password-link p-3 justify-content-center ">
      Forgot Password? Reset Password.
    </a>
  </div>
</div>

</Form>
    </>
  );
};

export default LoginForm;
