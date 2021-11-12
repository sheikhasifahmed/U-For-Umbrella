import React, { useRef, useState } from "react";
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

  const emailRef = useRef();
  const passRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = () => {
    setEmail(emailRef.current.value);
    setPassword(passRef.current.value);
  };

  function saveUser(name, email) {
    const userData = { displayName: name, email: email };

    fetch("https://backend-umbrella-asif.herokuapp.com/users", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
  }

  const login = (e) => {
    e.preventDefault();

    loginWithEmail(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { displayName, email } = user;
        saveUser(displayName, email);
        history.push(redirect_uri);
      })
      .catch((error) => {
        emailRef.current.value = "";
        passRef.current.value = "";
        alert("Something went wrong..!");
      });
  };

  const googleLogin = () => {
    signWithGoogle()
      .then((result) => {
        const user = result.user;
        const { displayName, email } = user;
        saveUser(displayName, email);
        history.push(redirect_uri);
      })
      .catch((error) => {
        alert("Something went wrong..!");
      });
  };

  return (
    <div className="top-space ">
      <div className="t-order" style={{ marginTop: "50px" }}>
        <div>
          <h5>Login your account with email & password</h5>

          <Form onSubmit={login} className="form-style   mx-auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onBlur={handleInput}
                type="email"
                ref={emailRef}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onBlur={handleInput}
                type="password"
                ref={passRef}
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
