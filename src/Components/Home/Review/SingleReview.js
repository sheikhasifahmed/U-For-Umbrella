import React from "react";
import Rating from "react-rating";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SingleReview = ({ review }) => {
  const { displayName, email, userRating, userReview } = review;
  const full = <FontAwesomeIcon style={{ color: "gold" }} icon={faStar} />;
  const empty = <FontAwesomeIcon style={{ color: "grey" }} icon={faStar} />;

  return (
    <div className="rev">
      <h4>{displayName}</h4>
      <p>{email}</p>
      <Rating
        initialRating={userRating}
        readonly
        emptySymbol={empty}
        fullSymbol={full}
      ></Rating>
      <p>{userReview}</p>
    </div>
  );
};

export default SingleReview;
