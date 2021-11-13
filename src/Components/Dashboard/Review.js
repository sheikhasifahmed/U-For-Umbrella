import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Form } from "react-bootstrap";
import Rating from "react-rating";
import useFirebase from "../../Firebase/useFirebase";
import { useHistory } from "react-router";

const Review = () => {
  const [userRating, setUserRating] = useState("");
  const [msg, setMsg] = useState(false);
  const { user } = useFirebase();
  const { displayName, email } = user;
  const textRef = useRef();
  const history = useHistory();

  const full = <FontAwesomeIcon style={{ color: "gold" }} icon={faStar} />;
  const empty = <FontAwesomeIcon style={{ color: "grey" }} icon={faStar} />;

  const handleValue = (value) => {
    setUserRating(value);
    setMsg(false);
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (userRating === "") {
      setMsg(true);
      return;
    }
    const userReview = textRef.current.value;
    const reviewInfo = { displayName, email, userReview, userRating };
    // console.log(reviewInfo);

    fetch("https://backend-umbrella-asif.herokuapp.com/reviews", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(reviewInfo),
    })
      .then((res) => {
        alert("Congrates! your review has been saved successfully..!");
        history.push("/home");
      })

      .catch((error) => {
        alert("Ops! something went wrong..!");
      });

    // textRef.current.value = "";
  };

  return (
    <div>
      <div className="t-order" style={{ marginTop: "50px" }}>
        <h5 className="text-center">Write your review here</h5>
        <Form onSubmit={handleReview}>
          <Form.Group className="mb-3" controlId="name.ControlInput1">
            <Form.Label>Your Name</Form.Label>
            <Form.Control value={displayName} type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} type="email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text.ControlTextarea1">
            <Form.Label>Write Review here</Form.Label>
            <Form.Control required ref={textRef} as="textarea" rows={3} />
          </Form.Group>
          <div
            className="d-flex justify-content-evenly py-3"
            style={{ backgroundColor: "lightcyan" }}
          >
            <h5>Rate our products:</h5>
            <Rating
              emptySymbol={empty}
              fullSymbol={full}
              onChange={handleValue}
            ></Rating>
          </div>
          {msg && <Alert variant="warning">Please, input a rating...</Alert>}
          <div className="d-flex justify-content-center mt-3">
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Review;
