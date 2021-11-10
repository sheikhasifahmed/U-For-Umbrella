import React from "react";
import pic from "../../images/kid.png";
import logo from "../../images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="banner">
      <div className="mx-auto my-auto">
        <img src={pic} alt="" />
      </div>
      <div className="banner-text mx-auto my-auto">
        <img src={logo} alt="" />
        <h3>
          A Trustworthy Umbrella Shop
          <br />
          Your All Season Protection
        </h3>
        <div className="d-flex justify-content-start mt-5">
          <Link to="/about">
            <Button className="m-3" variant="outline-dark">
              About Us
            </Button>
          </Link>
          <Link to="/products">
            <Button className="m-3" variant="outline-dark">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
