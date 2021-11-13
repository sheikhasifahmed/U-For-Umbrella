import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./Product";

const Products = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://backend-umbrella-asif.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch();
  }, []);

  return (
    <div className="top-space">
      <div className="prd-cont">
        {data.length ? (
          <div className="">
            <div className="grid">
              {data.map((p) => (
                <Product key={p._id} product={p}></Product>
              ))}
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
    </div>
  );
};

export default Products;
