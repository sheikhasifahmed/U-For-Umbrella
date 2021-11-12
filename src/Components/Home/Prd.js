import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "../Products/Product";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Prd = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://backend-umbrella-asif.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        const short = data.slice(0, 6);
        setData(short);
      });
  }, []);

  return (
    <div
      className="cont"
      style={{
        padding: "20px 30px",
      }}
    >
      {data.length ? (
        <div>
          <h2 style={{ textAlign: "center" }} className="mb-5 clr">
            ---Our Products--
          </h2>
          <div className="grid">
            {data.map((p) => (
              <Product product={p}></Product>
            ))}
          </div>
          <div className="d-flex justify-content-end mt-5">
            <Link to="/products">
              <h5>Explore All...</h5>
            </Link>
          </div>
        </div>
      ) : (
        <div className="loader">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
          <h3>Please Wait...</h3>
        </div>
      )}
    </div>
  );
};

export default Prd;
