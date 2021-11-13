import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import "bootstrap/dist/css/bootstrap.min.css";

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://backend-umbrella-asif.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch();
  }, []);

  return (
    <div className="cont">
      <div>
        <h3 className="font-weight-bold mb-5">Customer Reviews</h3>
        {reviews.map((rev) => (
          <SingleReview key={rev._id} review={rev}></SingleReview>
        ))}
      </div>
    </div>
  );
};

export default ShowReview;
