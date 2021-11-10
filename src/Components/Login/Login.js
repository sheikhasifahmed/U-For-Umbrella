import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import icon from "../../images/google.ico";
import { Button, Form } from "react-bootstrap";
import useFirebase from "../../Firebase/useFirebase";

const Login = () => {
  const { signWithGoogle, loginWithEmail } = useFirebase();

  const history = useHistory();
  const location = useLocation();
  const redirect_uri = location.state?.from || "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    loginWithEmail(email, password).then((userCredential) => {
      history.push(redirect_uri);
    });
  };

  const googleLogin = () => {
    signWithGoogle().then((result) => {
      history.push(redirect_uri);
    });
    console.log("login successful");
  };

  return (
    <div className="top-space ">
      <div className="t-order">
        <div>
          <h5>Login your account with email & password</h5>
          <Form onSubmit={login} className="form-style   mx-auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onBlur={handleEmail}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={handlePassword}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                required
                label="I accept all terms & conditions"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <p>
                Don't have an account ?{" "}
                <Link to="/register">click here to register</Link>
              </p>
            </div>
          </Form>
        </div>

        <div style={{ textAlign: "center" }} className="my-5">
          <h3 className="mt-5 mb-2">
            --------OR------- <br />
          </h3>

          <Button onClick={googleLogin} variant="outline-success">
            <img width="20" src={icon} alt="" /> Login With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
