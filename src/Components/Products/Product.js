import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import { useHistory } from "react-router";

const Product = (props) => {
  const { _id, productName, details, price, rating, image } = props.product;
  const history = useHistory();

  const handleBook = () => {
    history.push(`/purchase/${_id}`);
  };
  return (
    <div className="single">
      <div className="me-auto">
        <img src={image} alt="" />
      </div>
      <div className="ms-auto">
        <h3 className="mb-3">{productName}</h3>
        <p>{details}</p>

        <h5
          style={{
            backgroundColor: "lightslategrey",
            textAlign: "center",
            color: "white",
            padding: "7px 5px",
            borderRadius: "5px",
          }}
        >
          Price: ${price}
        </h5>
        <div className="d-flex justify-content-evenly align-items-center mt-3">
          <h5>rating: {rating}</h5>
          <Button variant="outline-dark" onClick={handleBook}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
