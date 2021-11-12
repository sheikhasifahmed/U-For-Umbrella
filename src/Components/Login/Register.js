import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";

import icon from "../../images/google.ico";
import useFirebase from "../../Firebase/useFirebase";

const Register = () => {
  const { signWithGoogle, registerWithEmail, updateUserName, addNewUser } =
    useFirebase();

  const history = useHistory();
  const location = useLocation();
  const redirect_uri = location.state?.from || "/home";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function saveUser(name, email) {
    const userData = { displayName: name, email: email };

    fetch("https://backend-umbrella-asif.herokuapp.com/users", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
  }

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

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const handleInput = (e) => {
    setEmail(emailRef.current.value);
    setPassword(passRef.current.value);
    setName(nameRef.current.value);
  };

  const updateName = () => {
    updateUserName(name);
  };

  // function saveUser() {
  //   const userData = { displayName: name, email: email };

  //   fetch("http://backend-umbrella-asif.herokuapp.com/users", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(userData),
  //   });
  // }

  const register = (e) => {
    e.preventDefault();
    saveUser(name, email);
    registerWithEmail(email, password)
      .then((userCredential) => {
        updateName();

        history.push("/home");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong..!");
        emailRef.current.value = "";
        passRef.current.value = "";
        nameRef.current.value = "";
      });
  };

  return (
    <div className="top-space">
      <div className="t-order mx-auto ">
        <div>
          <h5 className="text-start">
            Create an account with Email & password
          </h5>

          <Form onSubmit={register} className="form-style   mx-auto">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                onBlur={handleInput}
                ref={nameRef}
                type="text"
                placeholder="Enter user name"
              />
            </Form.Group>
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
                Already registered? <Link to="/login">click here to login</Link>
              </p>
            </div>
          </Form>
        </div>

        <div style={{ textAlign: "center" }} className="my-5">
          <h3 className="mb-2 mt-5">
            --------OR------- <br />
          </h3>
          <Button onClick={googleLogin} variant="outline-success">
            <img width="20" src={icon} alt="" /> Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
